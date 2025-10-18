/**
 * Seed script to populate database with subjects and sample questions
 * This is a placeholder - in production, questions would be loaded from the PDF files
 * 
 * To run: npx tsx server/seed.ts
 */

import { db } from "./db";
import { subjects, questions } from "@shared/schema";

const SUBJECTS_DATA = [
  { name: "Agriculture", duration: 60, questionCount: 50 },
  { name: "Biology", duration: 60, questionCount: 50 },
  { name: "Chemistry", duration: 60, questionCount: 50 },
  { name: "Christian Religious Studies", duration: 60, questionCount: 50 },
  { name: "Civic Education", duration: 60, questionCount: 50 },
  { name: "Commerce", duration: 60, questionCount: 50 },
  { name: "Computer", duration: 60, questionCount: 50 },
  { name: "Economics", duration: 60, questionCount: 50 },
  { name: "English", duration: 60, questionCount: 50 },
  { name: "Financial Accounting", duration: 60, questionCount: 50 },
  { name: "Government", duration: 60, questionCount: 50 },
  { name: "Islamic Studies", duration: 60, questionCount: 50 },
  { name: "Literature in English", duration: 60, questionCount: 50 },
  { name: "Mathematics", duration: 60, questionCount: 50 },
  { name: "Physics", duration: 60, questionCount: 50 },
];

async function seedSubjects() {
  console.log("Seeding subjects...");
  
  for (const subject of SUBJECTS_DATA) {
    await db.insert(subjects).values(subject).onConflictDoNothing();
  }
  
  console.log("✓ Subjects seeded successfully");
}

async function seedSampleQuestions() {
  console.log("Seeding sample questions...");
  
  // Get all subjects
  const allSubjects = await db.select().from(subjects);
  
  // Create 5 sample questions per subject for testing
  for (const subject of allSubjects) {
    for (let i = 1; i <= 5; i++) {
      await db.insert(questions).values({
        subjectId: subject.id,
        questionNumber: i,
        questionText: `Sample question ${i} for ${subject.name}. What is the correct answer to this multiple choice question?`,
        optionA: `Option A for question ${i}`,
        optionB: `Option B for question ${i}`,
        optionC: `Option C for question ${i} (Correct)`,
        optionD: `Option D for question ${i}`,
        correctOption: "C",
      }).onConflictDoNothing();
    }
  }
  
  console.log("✓ Sample questions seeded successfully");
}

async function main() {
  try {
    console.log("Starting database seeding...");
    
    await seedSubjects();
    await seedSampleQuestions();
    
    console.log("\n✓ Database seeded successfully!");
    console.log("\nNote: This includes sample questions only.");
    console.log("To load actual questions from PDFs, implement PDF parsing logic.\n");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
