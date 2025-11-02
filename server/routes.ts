import type { Express } from "express";
import { storage } from "./storage";
import { insertStudentSchema, subjects, questions } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Express {
  // Start exam - creates student and exam session
  app.post("/api/start-exam", async (req, res) => {
    try {
      const { name, gender, subject } = req.body;

      // Validate input
      const validatedStudent = insertStudentSchema.parse({ name, gender });

      // Create student
      const student = await storage.createStudent(validatedStudent);

      // Get subject by name
      const subjectData = await storage.getSubjectByName(subject);
      if (!subjectData) {
        return res.status(404).json({ message: "Subject not found" });
      }

      // Create exam session
      const examSession = await storage.createExamSession({
        studentId: student.id,
        subjectId: subjectData.id,
        totalQuestions: subjectData.questionCount,
      });

      res.json({
        examSessionId: examSession.id,
        studentId: student.id,
        subjectId: subjectData.id,
      });
    } catch (error: any) {
      console.error("Error starting exam:", error);
      res.status(400).json({ message: error.message || "Failed to start exam" });
    }
  });

  // Get exam session
  app.get("/api/exam-session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      // Get subject details using db.select
      const [subject] = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, session.subjectId));

      res.json({
        id: session.id,
        subjectId: session.subjectId,
        subjectName: subject?.name || "Unknown",
        duration: subject?.duration || 60,
        totalQuestions: session.totalQuestions,
        startTime: session.startTime,
        endTime: session.endTime,
        timeTaken: session.timeTaken,
        status: session.status,
      });
    } catch (error: any) {
      console.error("Error fetching exam session:", error);
      res.status(500).json({ message: "Failed to fetch exam session" });
    }
  });

  // Get questions for an exam session (shuffled deterministically based on session ID)
  // Note: English Language questions are NOT shuffled
  app.get("/api/questions/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      // Get session to find the subject ID
      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }
      
      // Get subject details to check if it's English
      const [subject] = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, session.subjectId));
      
      const allQuestions = await storage.getQuestionsBySubject(session.subjectId);
      
      // Don't send correct answers to frontend
      const questionsWithoutAnswers = allQuestions.map(({ correctOption, ...q }) => q);
      
      let finalQuestions = questionsWithoutAnswers;
      
      // Only shuffle if NOT English Language
      if (subject?.name !== "English") {
        const { shuffleArray } = await import("./utils/shuffle");
        finalQuestions = shuffleArray(questionsWithoutAnswers, sessionId);
        
        // Renumber questions sequentially (1, 2, 3...) after shuffle
        finalQuestions = finalQuestions.map((q, index) => ({
          ...q,
          questionNumber: index + 1
        }));
      }
      // For English, questions remain in their original order (no renumbering needed)
      
      res.json(finalQuestions);
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Save answer (autosave)
  app.post("/api/save-answer/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { questionId, selectedOption } = req.body;

      // Verify session exists
      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      // Verify session is still in progress
      if (session.status !== "in_progress") {
        return res.status(400).json({ message: "Cannot save answer: exam is not in progress" });
      }

      // Get the question to check correct answer
      const [question] = await db.select().from(questions).where(eq(questions.id, questionId));
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Only save if there's a selected option (allow clearing answers)
      if (selectedOption) {
        // Determine if answer is correct
        const isCorrect = selectedOption === question.correctOption;

        // Save answer
        const answer = await storage.saveAnswer({
          examSessionId: sessionId,
          questionId,
          selectedOption,
          isCorrect,
        });

        res.json({ success: true, answerId: answer.id });
      } else {
        // Just acknowledge, don't save null answers
        res.json({ success: true, message: "No answer selected" });
      }
    } catch (error: any) {
      console.error("Error saving answer:", error);
      res.status(500).json({ message: "Failed to save answer" });
    }
  });

  // Submit exam
  app.post("/api/submit-exam/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      // Get all answers for this session
      const allAnswers = await storage.getAnswersBySession(sessionId);

      // Calculate score
      const correctAnswers = allAnswers.filter(a => a.isCorrect === true).length;
      const totalQuestions = session.totalQuestions;

      // Calculate time taken
      if (!session.startTime) {
        return res.status(400).json({ message: "Cannot submit exam: exam not started" });
      }
      const startTime = new Date(session.startTime).getTime();
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds

      // Update exam session
      await storage.updateExamSession(sessionId, {
        status: "completed",
        endTime: new Date(),
        score: correctAnswers,
        timeTaken,
      });

      res.json({
        success: true,
        score: correctAnswers,
        totalQuestions,
        timeTaken,
      });
    } catch (error: any) {
      console.error("Error submitting exam:", error);
      res.status(500).json({ message: "Failed to submit exam" });
    }
  });

  // Get results
  app.get("/api/results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      // Get student details
      const student = await storage.getStudent(session.studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Get subject details using db.select
      const [subject] = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, session.subjectId));

      const percentage = ((session.score || 0) / session.totalQuestions) * 100;

      res.json({
        studentName: student.name,
        gender: student.gender,
        subjectName: subject?.name || "Unknown",
        score: session.score || 0,
        totalQuestions: session.totalQuestions,
        percentage: percentage,
        timeTaken: session.timeTaken || 0,
      });
    } catch (error: any) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  // Get all subjects (for reference)
  app.get("/api/subjects", async (req, res) => {
    try {
      const allSubjects = await storage.getAllSubjects();
      res.json(allSubjects);
    } catch (error: any) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Get saved answers for a session (for session recovery)
  app.get("/api/answers/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      const savedAnswers = await storage.getAnswersBySession(sessionId);
      
      // Return answers in a format easy to consume by frontend
      const answersMap = savedAnswers.reduce((acc, answer) => {
        if (answer.selectedOption) {
          acc[answer.questionId] = answer.selectedOption;
        }
        return acc;
      }, {} as Record<string, string>);

      res.json(answersMap);
    } catch (error: any) {
      console.error("Error fetching saved answers:", error);
      res.status(500).json({ message: "Failed to fetch saved answers" });
    }
  });

  // Start the exam timer (after user confirms in pre-check modal) - idempotent
  app.post("/api/exam-session/:sessionId/start", async (req, res) => {
    try {
      const { sessionId } = req.params;

      const session = await storage.getExamSession(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Exam session not found" });
      }

      // If already started, return success with existing startTime (idempotent)
      if (session.status === "in_progress" && session.startTime) {
        return res.json({
          success: true,
          startTime: session.startTime,
          alreadyStarted: true,
        });
      }

      // If completed, don't allow restart
      if (session.status === "completed" || session.status === "auto_submitted") {
        return res.status(400).json({ message: "Exam session already completed" });
      }

      // Update session to set startTime and change status to in_progress
      const updated = await storage.updateExamSession(sessionId, {
        startTime: new Date(),
        status: "in_progress",
      });

      res.json({
        success: true,
        startTime: updated.startTime,
      });
    } catch (error: any) {
      console.error("Error starting exam session:", error);
      res.status(500).json({ message: "Failed to start exam session" });
    }
  });

  return app;
}
