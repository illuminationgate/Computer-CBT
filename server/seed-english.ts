import { db } from "./db";
import { questions, subjects } from "../shared/schema";
import { eq } from "drizzle-orm";

const englishQuestions = [
  // Questions 1-10: Opposite meanings
  {
    questionNumber: 1,
    questionText: "It is _____, not optional for every citizen to take part in the monthly sanitation exercise.",
    optionA: "obliging",
    optionB: "forceful",
    optionC: "compelling",
    optionD: "mandatory",
    correctOption: "D"
  },
  {
    questionNumber: 2,
    questionText: "During the seminar, some participants were _____ while others were mute.",
    optionA: "adamant",
    optionB: "arguing",
    optionC: "vocal",
    optionD: "critical",
    correctOption: "C"
  },
  {
    questionNumber: 3,
    questionText: "Apart from one controversial bill, all the others were _____.",
    optionA: "acceptable",
    optionB: "understandable",
    optionC: "commendable",
    optionD: "defensible",
    correctOption: "A"
  },
  {
    questionNumber: 4,
    questionText: "Instead of acknowledging the problem at hand, the chief _____ it.",
    optionA: "criticized",
    optionB: "revealed",
    optionC: "addressed",
    optionD: "denied",
    correctOption: "D"
  },
  {
    questionNumber: 5,
    questionText: "It will be difficult to prove whether their actions were intentional or _____.",
    optionA: "careless",
    optionB: "wicked",
    optionC: "accidental",
    optionD: "reckless",
    correctOption: "D"
  },
  {
    questionNumber: 6,
    questionText: "We expected the criminal to be treated with scorn and not _____.",
    optionA: "fear",
    optionB: "cruelty",
    optionC: "kindness",
    optionD: "respect",
    correctOption: "A"
  },
  {
    questionNumber: 7,
    questionText: "The laws of this land are rigid while those of my country are _____.",
    optionA: "vague",
    optionB: "normal",
    optionC: "law",
    optionD: "regular",
    correctOption: "C"
  },
  {
    questionNumber: 8,
    questionText: "I assisted with the production of the soap but its advertisement was _____ by lack of funds.",
    optionA: "hindered",
    optionB: "obstructed",
    optionC: "dissuaded",
    optionD: "restricted",
    correctOption: "D"
  },
  {
    questionNumber: 9,
    questionText: "In this country, the elite have no patience with the _____.",
    optionA: "oppressed",
    optionB: "labourers",
    optionC: "weak",
    optionD: "masses",
    correctOption: "A"
  },
  {
    questionNumber: 10,
    questionText: "The government's domestic policy is geared towards encouraging _____ investment.",
    optionA: "foreign",
    optionB: "external",
    optionC: "tourist",
    optionD: "alien",
    correctOption: "B"
  },
  // Questions 11-20: Word completion
  {
    questionNumber: 11,
    questionText: "Because of the circumstances surrounding his death, his corpse was _____ after burial.",
    optionA: "extracted",
    optionB: "exhumed",
    optionC: "examined",
    optionD: "exorcised",
    correctOption: "A"
  },
  {
    questionNumber: 12,
    questionText: "Our school _____ a defeat in the last quiz competition.",
    optionA: "suffered",
    optionB: "received",
    optionC: "sustained",
    optionD: "endured",
    correctOption: "B"
  },
  {
    questionNumber: 13,
    questionText: "My brother has a _____ appetite and so he eats any food that comes his way.",
    optionA: "vivacious",
    optionB: "avaricious",
    optionC: "voracious",
    optionD: "tremendous",
    correctOption: "C"
  },
  {
    questionNumber: 14,
    questionText: "The wristwatch was not expensive but had great sentimental _____.",
    optionA: "feel",
    optionB: "value",
    optionC: "price",
    optionD: "view",
    correctOption: "B"
  },
  {
    questionNumber: 15,
    questionText: "Last week's earthquake _____ the city.",
    optionA: "troubled",
    optionB: "devastated",
    optionC: "shocked",
    optionD: "confused",
    correctOption: "D"
  },
  {
    questionNumber: 16,
    questionText: "Our government has always placed an _____ on the sale of harmful drugs.",
    optionA: "embargo",
    optionB: "abstention",
    optionC: "injunction",
    optionD: "obstruction",
    correctOption: "A"
  },
  {
    questionNumber: 17,
    questionText: "The facts were so _____ that the plaintiff broke down in tears.",
    optionA: "disfigured",
    optionB: "deformed",
    optionC: "distorted",
    optionD: "disjointed",
    correctOption: "C"
  },
  {
    questionNumber: 18,
    questionText: "She _____ my appetite with the soup.",
    optionA: "raised",
    optionB: "increased",
    optionC: "whetted",
    optionD: "heightened",
    correctOption: "D"
  },
  {
    questionNumber: 19,
    questionText: "My cousin is very _____; he always says please, excuse me and thank you.",
    optionA: "gentle",
    optionB: "courteous",
    optionC: "graceful",
    optionD: "aristocratic",
    correctOption: "B"
  },
  {
    questionNumber: 20,
    questionText: "The three armed robbers were _____ to five years' imprisonment.",
    optionA: "jailed",
    optionB: "condemned",
    optionC: "charged",
    optionD: "sentenced",
    correctOption: "C"
  },
  // Questions 21-30: Interpretations
  {
    questionNumber: 21,
    questionText: "My friend's bad behaviour made my blood boil. This means that I",
    optionA: "was agitated by friend's bad behaviour.",
    optionB: "was hurt by my friend's bad behaviour.",
    optionC: "was confused when my friend behaved badly.",
    optionD: "ignored my friend when he behaved badly.",
    correctOption: "A"
  },
  {
    questionNumber: 22,
    questionText: "Even though he was proud, he was made to eat his words. This means that he",
    optionA: "had to retrieve the documents.",
    optionB: "was made to cook alone.",
    optionC: "could not speak to anyone on the issue.",
    optionD: "was forced to admit his error.",
    correctOption: "D"
  },
  {
    questionNumber: 23,
    questionText: "Our school swept the board at the inter-school sports competition. This means that our school",
    optionA: "performed very badly.",
    optionB: "triumphed in all aspects of the competition.",
    optionC: "withdrew from the competition.",
    optionD: "could not survive the competition.",
    correctOption: "B"
  },
  {
    questionNumber: 24,
    questionText: "She made a beeline from my house to the stadium. This means that she",
    optionA: "lost her way to the stadium.",
    optionB: "was chased by bees all the way to the stadium.",
    optionC: "went directly and quickly to the stadium.",
    optionD: "took a strange route from my house to the stadium.",
    correctOption: "C"
  },
  {
    questionNumber: 25,
    questionText: "Many politicians throw dust in the eyes of the masses. This means that many politicians",
    optionA: "rebuke the masses.",
    optionB: "harass the masses.",
    optionC: "deceive the masses.",
    optionD: "overpower the masses.",
    correctOption: "A"
  },
  {
    questionNumber: 26,
    questionText: "Mr Opeh has always managed to keep his head above water. This means that Mr Opeh",
    optionA: "keeps his head above water when swimming.",
    optionB: "likes swimming very much.",
    optionC: "knows the techniques for survival.",
    optionD: "stays out of financial difficulty.",
    correctOption: "D"
  },
  {
    questionNumber: 27,
    questionText: "Matters came to a head when the man walked off with him. This means that the",
    optionA: "accusation worsened the relationship.",
    optionB: "complete the conflict.",
    optionC: "couple were living peacefully before accusation.",
    optionD: "husband hit the wife on the head because her misbehaviour.",
    correctOption: "A"
  },
  {
    questionNumber: 28,
    questionText: "The two warrants countries agreed to buy a hatchet. This means that the countries agreed to",
    optionA: "become friends again.",
    optionB: "hide their hatchet.",
    optionC: "exchange prisoners.",
    optionD: "open their borders.",
    correctOption: "D"
  },
  {
    questionNumber: 29,
    questionText: "She is eating her heart out for a sitting who says:",
    optionA: "will be there.",
    optionB: "quarrelling with her suitor.",
    optionC: "angry with her suitor.",
    optionD: "longing for her suitor.",
    correctOption: "C"
  },
  {
    questionNumber: 30,
    questionText: "The new priest is very down-to-earth. This means that he is",
    optionA: "practical.",
    optionB: "very short.",
    optionC: "very humble.",
    optionD: "prayerful.",
    correctOption: "A"
  },
  // Questions 31-40: Nearest meaning
  {
    questionNumber: 31,
    questionText: "The villagers showered encounters on the grass.",
    optionA: "passes.",
    optionB: "presents.",
    optionC: "tributes.",
    optionD: "blessings.",
    correctOption: "D"
  },
  {
    questionNumber: 32,
    questionText: "The borsar absconded with our school (nash) suddenly",
    optionA: "disappeared.",
    optionB: "travelled.",
    optionC: "arrived safely.",
    optionD: "gambled.",
    correctOption: "A"
  },
  {
    questionNumber: 33,
    questionText: "The campaign rally was deferred due to the heavy rains",
    optionA: "cancelled",
    optionB: "postponed",
    optionC: "stopped",
    optionD: "banned",
    correctOption: "B"
  },
  {
    questionNumber: 34,
    questionText: "Anna's evidence corroborates that of Fatima.",
    optionA: "amplifies",
    optionB: "guarantees",
    optionC: "reinforces",
    optionD: "demonstrates",
    correctOption: "C"
  },
  {
    questionNumber: 35,
    questionText: "The prisoner was kept in solitary confinement.",
    optionA: "quiet",
    optionB: "lonely",
    optionC: "tight",
    optionD: "dark",
    correctOption: "B"
  },
  {
    questionNumber: 36,
    questionText: "Surely, Akl's mistake is parolombic.",
    optionA: "questionable",
    optionB: "minor",
    optionC: "excusable",
    optionD: "negligible",
    correctOption: "C"
  },
  {
    questionNumber: 37,
    questionText: "The lecturer showed much gratifixion.",
    optionA: "insight",
    optionB: "knowledge",
    optionC: "wisdom",
    optionD: "research",
    correctOption: "B"
  },
  {
    questionNumber: 38,
    questionText: "We should emulate the virtues of our peers.",
    optionA: "duplicate",
    optionB: "observe",
    optionC: "imitate",
    optionD: "preserve",
    correctOption: "C"
  },
  {
    questionNumber: 39,
    questionText: "Our driver was oblivious of the shouting at the back seat.",
    optionA: "annoyed",
    optionB: "unmistakable",
    optionC: "tireless",
    optionD: "destroys",
    correctOption: "B"
  },
  {
    questionNumber: 40,
    questionText: "He was reluctant to grant my request.",
    optionA: "opposed",
    optionB: "delighted",
    optionC: "indifferent",
    optionD: "insulting",
    correctOption: "D"
  },
  // Questions 41-70: Best completes
  {
    questionNumber: 41,
    questionText: "It was not Ayi Kwei Arnab who wrote \"Black Boy\" _____?",
    optionA: "wasn't he",
    optionB: "was it",
    optionC: "isn't it",
    optionD: "was he",
    correctOption: "B"
  },
  {
    questionNumber: 42,
    questionText: "We now have a new _____.",
    optionA: "black American managing director",
    optionB: "black managing director's mercian",
    optionC: "American black managing director",
    optionD: "managing director black American",
    correctOption: "A"
  },
  {
    questionNumber: 43,
    questionText: "The _____ are being briefed about the latest developments in the West African region.",
    optionA: "commander-in-chief",
    optionB: "commander-in-chief",
    optionC: "commanders-in-chief",
    optionD: "commanders-in-chiefs",
    correctOption: "C"
  },
  {
    questionNumber: 44,
    questionText: "If you don't want to be overheard, don't talk _____.",
    optionA: "bad",
    optionB: "much loud",
    optionC: "badly",
    optionD: "more loudly",
    correctOption: "C"
  },
  {
    questionNumber: 45,
    questionText: "You should start to investigate _____ you get the statements of the prisoner.",
    optionA: "no sooner",
    optionB: "as soon as",
    optionC: "so soon as",
    optionD: "as soon",
    correctOption: "B"
  },
  {
    questionNumber: 46,
    questionText: "Tom played _____ than anyone else.",
    optionA: "worse",
    optionB: "badly",
    optionC: "bad",
    optionD: "worst",
    correctOption: "A"
  },
  {
    questionNumber: 47,
    questionText: "With _____ we entered the contest.",
    optionA: "Amadou acted as our leader",
    optionB: "Amadou acting as our leader",
    optionC: "Amadou acts as our leader",
    optionD: "Amadou act as our leader",
    correctOption: "D"
  },
  {
    questionNumber: 48,
    questionText: "The minister has insisted _____ continuing the demolition exercise:",
    optionA: "in",
    optionB: "on",
    optionC: "for",
    optionD: "at",
    correctOption: "B"
  },
  {
    questionNumber: 49,
    questionText: "When we were children, we _____ that song everyday after breakfast",
    optionA: "have sung",
    optionB: "sing",
    optionC: "are singing",
    optionD: "sang",
    correctOption: "B"
  },
  {
    questionNumber: 50,
    questionText: "Tom will never pass Mathematics _____ he tries.",
    optionA: "however hard",
    optionB: "as much as",
    optionC: "how much",
    optionD: "no matter hard",
    correctOption: "A"
  },
  {
    questionNumber: 51,
    questionText: "The principal, with his staff, _____ on a conducted tour of the school farm.",
    optionA: "is",
    optionB: "are being",
    optionC: "have been",
    optionD: "were",
    correctOption: "D"
  },
  {
    questionNumber: 52,
    questionText: "No sooner _____ the car than the gunman rushed at him.",
    optionA: "was he opening",
    optionB: "would he be opening",
    optionC: "had he been opening",
    optionD: "had he opened",
    correctOption: "A"
  },
  {
    questionNumber: 53,
    questionText: "Your boss is in _____ position to brief you on the outcome of the meeting.",
    optionA: "a best",
    optionB: "best",
    optionC: "better",
    optionD: "a better",
    correctOption: "D"
  },
  {
    questionNumber: 54,
    questionText: "The jury wanted to go over several _____ testimonies.",
    optionA: "witness'",
    optionB: "witnesses'",
    optionC: "witnesses'",
    optionD: "witness",
    correctOption: "D"
  },
  {
    questionNumber: 55,
    questionText: "We do not know what the future holds for us, _____?",
    optionA: "do we",
    optionB: "didn't we",
    optionC: "isn't it",
    optionD: "we do",
    correctOption: "A"
  },
  {
    questionNumber: 56,
    questionText: "Although Mr. Tanidoh is a university, _____ wants to teach in the primary way.",
    optionA: "but he",
    optionB: "he yet",
    optionC: "still yet",
    optionD: "he",
    correctOption: "B"
  },
  {
    questionNumber: 57,
    questionText: "The manager expects every worker to stay _____.",
    optionA: "myself",
    optionB: "yourself",
    optionC: "himself",
    optionD: "ourselves",
    correctOption: "C"
  },
  {
    questionNumber: 58,
    questionText: "Few people _____ their word.",
    optionA: "live for",
    optionB: "live by",
    optionC: "live with",
    optionD: "live on",
    correctOption: "B"
  },
  {
    questionNumber: 59,
    questionText: "It is good to give _____ where necessary.",
    optionA: "whatever advice",
    optionB: "advice",
    optionC: "an advice",
    optionD: "advise",
    correctOption: "D"
  },
  {
    questionNumber: 60,
    questionText: "Most of the pupils _____ their hands to answer question.",
    optionA: "raised on",
    optionB: "raised above",
    optionC: "raised up",
    optionD: "raised",
    correctOption: "D"
  },
  {
    questionNumber: 61,
    questionText: "The committee has appended a note to _____ report.",
    optionA: "it",
    optionB: "its",
    optionC: "their",
    optionD: "it's",
    correctOption: "B"
  },
  {
    questionNumber: 62,
    questionText: "Ignorance _____ the law is no excuse.",
    optionA: "for",
    optionB: "about",
    optionC: "of",
    optionD: "before",
    correctOption: "C"
  },
  {
    questionNumber: 63,
    questionText: "The colours on the fabric are _____ brightly my liking.",
    optionA: "too",
    optionB: "quite",
    optionC: "so",
    optionD: "very",
    correctOption: "A"
  },
  {
    questionNumber: 64,
    questionText: "Oprah is the _____ student in our class.",
    optionA: "elevated",
    optionB: "slower",
    optionC: "elevated",
    optionD: "much slower",
    correctOption: "C"
  },
  {
    questionNumber: 65,
    questionText: "Doreen can't sing _____ as her sister.",
    optionA: "better",
    optionB: "as well",
    optionC: "so well",
    optionD: "more",
    correctOption: "B"
  },
  {
    questionNumber: 66,
    questionText: "The guard did not see the burglar _____ the office.",
    optionA: "entered",
    optionB: "having entered",
    optionC: "enter",
    optionD: "to enter",
    correctOption: "C"
  },
  {
    questionNumber: 67,
    questionText: "Farmers try to sell their produce _____ a profit.",
    optionA: "in",
    optionB: "with",
    optionC: "at",
    optionD: "on",
    correctOption: "C"
  },
  {
    questionNumber: 68,
    questionText: "His wife thinks that buying a new car is _____.",
    optionA: "the unnecessary expense",
    optionB: "some unnecessary expense",
    optionC: "an unnecessary expense",
    optionD: "unnecessary expense",
    correctOption: "C"
  },
  {
    questionNumber: 69,
    questionText: "The director is open _____ criticism.",
    optionA: "for",
    optionB: "to",
    optionC: "on",
    optionD: "about",
    correctOption: "B"
  },
  {
    questionNumber: 70,
    questionText: "Everyone was happy when the two friends _____ with each other.",
    optionA: "made off",
    optionB: "made do",
    optionC: "made away",
    optionD: "made up",
    correctOption: "D"
  },
  // Questions 71-80: Passage completion
  {
    questionNumber: 71,
    questionText: "A student had a severe attack of malaria and was rushed to the hospital in a private ambulance. He was brought to the .71. ward where the doctor or duty was waiting to attend to him.",
    optionA: "in-patient",
    optionB: "medical",
    optionC: "out-patient",
    optionD: "surgical",
    correctOption: "C"
  },
  {
    questionNumber: 72,
    questionText: "The patient was wheeled into the consulting room on a .72. and the nurses stepped aside for the doctor to start his examination.",
    optionA: "truck",
    optionB: "nolley",
    optionC: "stretcher",
    optionD: "table",
    correctOption: "C"
  },
  {
    questionNumber: 73,
    questionText: "He took out his .73. - placed its arms into his ears to listen to the patient's heartbeat.",
    optionA: "telescope",
    optionB: "microscope",
    optionC: "periscope",
    optionD: "stethoscope",
    correctOption: "A"
  },
  {
    questionNumber: 74,
    questionText: "The patient's temperature was taken with a clinical .74.",
    optionA: "thermometer",
    optionB: "hydrometer",
    optionC: "crucible",
    optionD: "spatula",
    correctOption: "D"
  },
  {
    questionNumber: 75,
    questionText: "When the doctor completed his diagnosis, he asked the nurse to take the patient to the .75. where he was kept under observation for twenty-four hours.",
    optionA: "ward",
    optionB: "hall",
    optionC: "room",
    optionD: "lounge",
    correctOption: "A"
  },
  {
    questionNumber: 76,
    questionText: "Drugs and injections were .76. by the doctor and were administered by the nurses.",
    optionA: "prescribed",
    optionB: "written",
    optionC: "authorised",
    optionD: "ordered",
    correctOption: "A"
  },
  {
    questionNumber: 77,
    questionText: "One of the nurses loaded a .77. for an injection to be given to the patient.",
    optionA: "capsule",
    optionB: "syringe",
    optionC: "vial",
    optionD: "tube",
    correctOption: "A"
  },
  {
    questionNumber: 78,
    questionText: "Two days later, he started to .78. and the doctor decided to .79. him.",
    optionA: "relax",
    optionB: "recoup",
    optionC: "recuperate",
    optionD: "revive",
    correctOption: "B"
  },
  {
    questionNumber: 79,
    questionText: "The doctor decided to .79. him.",
    optionA: "discharge",
    optionB: "release",
    optionC: "free",
    optionD: "acquit",
    correctOption: "C"
  },
  {
    questionNumber: 80,
    questionText: "He was advised by the doctor to sleep under a .80. mosquito net.",
    optionA: "dyed",
    optionB: "treated",
    optionC: "washed",
    optionD: "sprayed",
    correctOption: "A"
  }
];

async function seedEnglishQuestions() {
  try {
    console.log("Starting English questions seed...");

    // Get English subject ID
    const englishSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "English")
    });

    if (!englishSubject) {
      console.error("English subject not found!");
      return;
    }

    console.log(`Found English subject with ID: ${englishSubject.id}`);

    let successCount = 0;
    let skipCount = 0;

    for (const question of englishQuestions) {
      try {
        // Check if question already exists
        const existing = await db.query.questions.findFirst({
          where: (q, { and, eq }) => and(
            eq(q.subjectId, englishSubject.id),
            eq(q.questionNumber, question.questionNumber)
          )
        });

        if (existing) {
          console.log(`Question ${question.questionNumber} already exists, skipping...`);
          skipCount++;
          continue;
        }

        await db.insert(questions).values({
          subjectId: englishSubject.id,
          questionNumber: question.questionNumber,
          questionText: question.questionText,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctOption: question.correctOption
        });

        successCount++;
        console.log(`✓ Added question ${question.questionNumber}`);
      } catch (error) {
        console.error(`Error adding question ${question.questionNumber}:`, error);
      }
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`   Successfully added: ${successCount} questions`);
    console.log(`   Skipped (duplicates): ${skipCount} questions`);
    console.log(`   Total questions: ${englishQuestions.length}`);

  } catch (error) {
    console.error("Error during seeding:", error);
  }

  process.exit(0);
}

seedEnglishQuestions();
