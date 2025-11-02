import { db } from "./db";
import { questions, subjects } from "../shared/schema";
import { eq, and } from "drizzle-orm";

const instructions = {
  section1_10: "In each of the following sentences, there is one underlined word and one gap. From the list of words lettered A to D, choose the one that is most nearly opposite in meaning to the underlined word and that will, at the same time, correctly fill the gap in the sentence.",
  section11_20: "From the words lettered A to D, choose the word that best completes each of the following sentences.",
  section21_30: "In each of the following sentences, a list of possible interpretations is given. Choose the interpretation that is most appropriate for each sentence.",
  section31_40: "From the words lettered A to D before each of the following sentences, choose the word or group words that is nearest in meaning to the underlined word as it is used in the sentence.",
  section41_70: "From the words or group of words lettered A to D, choose the word or group of words that best completes each of the following sentences:",
  section71_80: "In the following passage, the numbered gaps indicate missing words. Against each number in the list below, four options are given in columns lettered A to D. Choose the word that is the most suitable to fill the numbered gap in the passage.\n\nA student had a severe attack of malaria and was rushed to the hospital in a private ambulance. He was brought to the ward where the doctor on duty was waiting to attend to him. The patient was wheeled into the consulting room on a stretcher and the nurses stepped aside for the doctor to start his examination. He took out his stethoscope - placed its arms into his ears to listen to the patient's heartbeat. The patient's temperature was taken with a clinical thermometer.\n\nWhen the doctor completed his diagnosis, he asked the nurse to take the patient to the ward where he was kept under observation for twenty-four hours.\n\nDrugs and injections were prescribed by the doctor and were administered by the nurses. One of the nurses loaded a syringe for an injection to be given to the patient. Two days later, he started to recuperate and the doctor decided to discharge him. He was advised by the doctor to sleep under a treated mosquito net."
};

function getInstructionForQuestion(questionNumber: number): string {
  if (questionNumber >= 1 && questionNumber <= 10) {
    return instructions.section1_10;
  } else if (questionNumber >= 11 && questionNumber <= 20) {
    return instructions.section11_20;
  } else if (questionNumber >= 21 && questionNumber <= 30) {
    return instructions.section21_30;
  } else if (questionNumber >= 31 && questionNumber <= 40) {
    return instructions.section31_40;
  } else if (questionNumber >= 41 && questionNumber <= 70) {
    return instructions.section41_70;
  } else if (questionNumber >= 71 && questionNumber <= 80) {
    return instructions.section71_80;
  }
  return "";
}

async function updateEnglishInstructions() {
  try {
    console.log("Starting English instructions update...");

    // Get English subject ID
    const englishSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "English")
    });

    if (!englishSubject) {
      console.error("English subject not found!");
      return;
    }

    console.log(`Found English subject with ID: ${englishSubject.id}`);

    // Get all English questions
    const englishQuestions = await db.query.questions.findMany({
      where: eq(questions.subjectId, englishSubject.id)
    });

    console.log(`Found ${englishQuestions.length} English questions`);

    let updateCount = 0;

    for (const question of englishQuestions) {
      const instruction = getInstructionForQuestion(question.questionNumber);
      
      await db
        .update(questions)
        .set({ instruction })
        .where(eq(questions.id, question.id));

      updateCount++;
      if (updateCount % 10 === 0) {
        console.log(`Updated ${updateCount} questions...`);
      }
    }

    console.log(`\n✅ Successfully updated ${updateCount} English questions with instructions!`);

  } catch (error) {
    console.error("Error updating instructions:", error);
  }

  process.exit(0);
}

updateEnglishInstructions();
