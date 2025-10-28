import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Students table - stores registration information
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  gender: varchar("gender", { length: 10 }).notNull(), // Male or Female
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subjects table - 15 WAEC/NECO subjects with their configurations
export const subjects = pgTable("subjects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  duration: integer("duration").notNull(), // Duration in minutes
  questionCount: integer("question_count").notNull(),
});

// Questions table - stores all exam questions
export const questions = pgTable("questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subjectId: varchar("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  questionNumber: integer("question_number").notNull(),
  questionText: text("question_text").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  optionE: text("option_e"), // Optional 5th option for questions that have it
  correctOption: varchar("correct_option", { length: 1 }).notNull(), // A, B, C, D, or E
}, (table) => ({
  // Unique index to prevent duplicate questions per subject
  uniqueSubjectQuestion: uniqueIndex("questions_subject_id_question_number_idx").on(table.subjectId, table.questionNumber),
}));

// Exam Sessions table - tracks individual exam attempts
export const examSessions = pgTable("exam_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  subjectId: varchar("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
  startTime: timestamp("start_time"), // Set when user confirms start, not on session creation
  endTime: timestamp("end_time"),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, in_progress, completed, auto_submitted
  score: integer("score"),
  totalQuestions: integer("total_questions").notNull(),
  timeTaken: integer("time_taken"), // Time taken in seconds
});

// Answers table - stores student responses with autosave support
export const answers = pgTable("answers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  examSessionId: varchar("exam_session_id").notNull().references(() => examSessions.id, { onDelete: "cascade" }),
  questionId: varchar("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
  selectedOption: varchar("selected_option", { length: 1 }), // A, B, C, D or null if unanswered
  isCorrect: boolean("is_correct"),
  savedAt: timestamp("saved_at").defaultNow().notNull(),
});

// Relations
export const studentsRelations = relations(students, ({ many }) => ({
  examSessions: many(examSessions),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
  questions: many(questions),
  examSessions: many(examSessions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [questions.subjectId],
    references: [subjects.id],
  }),
  answers: many(answers),
}));

export const examSessionsRelations = relations(examSessions, ({ one, many }) => ({
  student: one(students, {
    fields: [examSessions.studentId],
    references: [students.id],
  }),
  subject: one(subjects, {
    fields: [examSessions.subjectId],
    references: [subjects.id],
  }),
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  examSession: one(examSessions, {
    fields: [answers.examSessionId],
    references: [examSessions.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));

// Zod schemas for validation
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["Male", "Female"], { required_error: "Please select a gender" }),
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertExamSessionSchema = createInsertSchema(examSessions).omit({
  id: true,
  startTime: true,
  endTime: true,
  status: true,
  score: true,
  timeTaken: true,
});

export const insertAnswerSchema = createInsertSchema(answers).omit({
  id: true,
  savedAt: true,
  isCorrect: true,
});

// Type exports
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type ExamSession = typeof examSessions.$inferSelect;
export type InsertExamSession = z.infer<typeof insertExamSessionSchema>;

export type Answer = typeof answers.$inferSelect;
export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
