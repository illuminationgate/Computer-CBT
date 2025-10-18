// Referenced from blueprint:javascript_database - adapted for CBT platform
import {
  students,
  subjects,
  questions,
  examSessions,
  answers,
  type Student,
  type InsertStudent,
  type Subject,
  type InsertSubject,
  type Question,
  type InsertQuestion,
  type ExamSession,
  type InsertExamSession,
  type Answer,
  type InsertAnswer,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Student operations
  createStudent(student: InsertStudent): Promise<Student>;
  getStudent(id: string): Promise<Student | undefined>;

  // Subject operations
  createSubject(subject: InsertSubject): Promise<Subject>;
  getAllSubjects(): Promise<Subject[]>;
  getSubjectByName(name: string): Promise<Subject | undefined>;

  // Question operations
  createQuestion(question: InsertQuestion): Promise<Question>;
  getQuestionsBySubject(subjectId: string): Promise<Question[]>;

  // Exam session operations
  createExamSession(session: InsertExamSession): Promise<ExamSession>;
  getExamSession(id: string): Promise<ExamSession | undefined>;
  updateExamSession(id: string, updates: Partial<ExamSession>): Promise<ExamSession>;

  // Answer operations
  saveAnswer(answer: InsertAnswer): Promise<Answer>;
  getAnswersBySession(examSessionId: string): Promise<Answer[]>;
  getAnswer(examSessionId: string, questionId: string): Promise<Answer | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Student operations
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db
      .insert(students)
      .values(insertStudent)
      .returning();
    return student;
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  // Subject operations
  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const [subject] = await db
      .insert(subjects)
      .values(insertSubject)
      .returning();
    return subject;
  }

  async getAllSubjects(): Promise<Subject[]> {
    return await db.select().from(subjects);
  }

  async getSubjectByName(name: string): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.name, name));
    return subject || undefined;
  }

  // Question operations
  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questions)
      .values(insertQuestion)
      .returning();
    return question;
  }

  async getQuestionsBySubject(subjectId: string): Promise<Question[]> {
    const { asc } = await import("drizzle-orm");
    return await db
      .select()
      .from(questions)
      .where(eq(questions.subjectId, subjectId))
      .orderBy(asc(questions.questionNumber));
  }

  // Exam session operations
  async createExamSession(insertSession: InsertExamSession): Promise<ExamSession> {
    const [session] = await db
      .insert(examSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getExamSession(id: string): Promise<ExamSession | undefined> {
    const [session] = await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.id, id));
    return session || undefined;
  }

  async updateExamSession(id: string, updates: Partial<ExamSession>): Promise<ExamSession> {
    const [updated] = await db
      .update(examSessions)
      .set(updates)
      .where(eq(examSessions.id, id))
      .returning();
    return updated;
  }

  // Answer operations
  async saveAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    // Check if answer already exists for this question in this session
    const existing = await this.getAnswer(
      insertAnswer.examSessionId,
      insertAnswer.questionId
    );

    if (existing) {
      // Update existing answer with recomputed isCorrect
      const [updated] = await db
        .update(answers)
        .set({
          selectedOption: insertAnswer.selectedOption,
          isCorrect: insertAnswer.isCorrect,
          savedAt: new Date(),
        })
        .where(eq(answers.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new answer
      const [answer] = await db
        .insert(answers)
        .values(insertAnswer)
        .returning();
      return answer;
    }
  }

  async getAnswersBySession(examSessionId: string): Promise<Answer[]> {
    return await db
      .select()
      .from(answers)
      .where(eq(answers.examSessionId, examSessionId));
  }

  async getAnswer(examSessionId: string, questionId: string): Promise<Answer | undefined> {
    const [answer] = await db
      .select()
      .from(answers)
      .where(
        and(
          eq(answers.examSessionId, examSessionId),
          eq(answers.questionId, questionId)
        )
      );
    return answer || undefined;
  }
}

export const storage = new DatabaseStorage();
