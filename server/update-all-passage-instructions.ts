import { db } from "./db";
import { questions, subjects } from "@shared/schema";
import { eq, and, gte, lte } from "drizzle-orm";

async function updateAllPassageInstructions() {
  try {
    // Get English subject
    const englishSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "English"),
    });

    if (!englishSubject) {
      console.error("English subject not found");
      return;
    }

    // Corrected instruction with gaps (not filled in answers)
    const passageInstruction = `In the following passage, the numbered gaps indicate missing words. Against each number in the list below, four options are given in columns lettered A to D. Choose the word that is the most suitable to fill the numbered gaps in the passage.

A student had a severe attack of malaria and was rushed to the hospital in a private ambulance. He was brought to the ………71………. ward where the doctor on duty was waiting to attend to him. The patient was wheeled into the consulting room on a ………72………. and the nurses stepped aside for the doctor to start his examination. He took out his ………73………. - placed its arms into his ears to listen to the patient's heartbeat. The patient's temperature was taken with a clinical ………74……….

When the doctor completed his diagnosis, he asked the nurse to take the patient to the ………75………. where he was kept under observation for twenty-four hours.

Drugs and injections were ………76………. by the doctor and were administered by the nurses. One of the nurses loaded a ………77………. for an injection to be given to the patient. Two days later, he started to ………78………. and the doctor decided to ………79………. him. He was advised by the doctor to sleep under a ………80………. mosquito net.`;

    // Update ALL questions 71-80 with the corrected passage instruction
    await db
      .update(questions)
      .set({ instruction: passageInstruction })
      .where(
        and(
          eq(questions.subjectId, englishSubject.id),
          gte(questions.questionNumber, 71),
          lte(questions.questionNumber, 80)
        )
      );

    console.log("✅ Updated passage instruction for ALL questions 71-80");
  } catch (error) {
    console.error("Error updating passage instructions:", error);
  }
}

updateAllPassageInstructions();
