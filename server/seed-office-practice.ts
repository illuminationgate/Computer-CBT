import { db } from "./db";
import { subjects, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

async function seedOfficePractice() {
  console.log("Starting Office Practice seed...");

  try {
    // Find or create Office Practice subject
    const existingSubjects = await db
      .select()
      .from(subjects)
      .where(eq(subjects.name, "Office Practice"));

    let subjectId: string;

    if (existingSubjects.length > 0) {
      subjectId = existingSubjects[0].id;
      console.log("Office Practice subject already exists, using existing ID:", subjectId);
    } else {
      const newSubjects = await db
        .insert(subjects)
        .values({
          name: "Office Practice",
          duration: 50, // 50 minutes for 50 questions
          questionCount: 50,
        })
        .returning();
      subjectId = newSubjects[0].id;
      console.log("Created Office Practice subject with ID:", subjectId);
    }

    // Office Practice questions with answers
    const officePracticeQuestions = [
      {
        questionNumber: 1,
        questionText: "Miscellaneous file form document should be opened when",
        options: ["the original file form document cannot be located", "there is insufficient correspondence from one source to justify opening new file.", "there is insufficient time for the filing clerk to assemble relevant document to open a new file", "there are sufficient documents from various sources to justify opening a new file"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 2,
        questionText: "Transmission of information between officers of the same level is",
        options: ["diagonal communication", "vertical communication", "horizontal communication", "lateral communication"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 3,
        questionText: '"Who is who" is a book that contains information of',
        options: ["important people who are still living.", "people who are dead.", "people who are not eminent.", "late people but important."],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 4,
        questionText: "Which of the following documents is handled by the receptionist?",
        options: ["Minutes of meetings", "Telephone message pad", "The manager's diary", "Requisition form"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 5,
        questionText: "The type of incoming mail that should be delivered to their addresses unopened is",
        options: ["urgent mail", "personal mail", "official mail", "registered mail"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 6,
        questionText: "Filing document according to dates is",
        options: ["geographical filing", "subject filing", "numerical filing", "chronological filing"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 7,
        questionText: "The three components of a short report are the",
        options: ["introduction, body and findings.", "introduction, body and conclusion.", "terms of reference, body and conclusion.", "terms of reference, body and recommendations"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 8,
        questionText: "The communication channel in the diagram above is",
        options: ["vertical", "diagonal", "lateral", "horizontal"],
        correctAnswer: "A",
        instruction: "Study the diagram below:\n\n![Horizontal Communication Diagram](@assets/Screenshot 2025-11-07 155453_1762528141868.png)",
      },
      {
        questionNumber: 9,
        questionText: "A committee which ceases to exist after completing its assignment is",
        options: ["a standing committee", "an investigatory committee", "ad-hoc committee", "advisory committee"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 10,
        questionText: "Which of the following statements is true about a quotation? It shows the",
        options: ["total of goods supplied.", "quality of goods in the warehouse.", "total cost of goods produced.", "prices of goods enquired about."],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 11,
        questionText: "To break a tie resulting from a poll, the chairman should",
        options: ["ask members to vote again", "use his power of casting vote", "use his discretion to take a decision", "ask his executive members to advise him"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 12,
        questionText: "The raw materials and equipment needed in an organization should be bought by the",
        options: ["human resource department", "purchasing department", "marketing department", "accounts department"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 13,
        questionText: "A letter sent by Mrs. Benson to her husband by post through his office address is an example of",
        options: ["urgent mail.", "official mail", "personal mail", "confidential mail"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 14,
        questionText: "In order to eliminate barrier to effective communication, the sender should",
        options: ["use as much jargons as he can.", "consider the level of recipient's education.", "expect the recipient to use a dictionary in decoding.", "discourage the recipient from giving a feedback."],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 15,
        questionText: "The machine that is used to destroy unwanted papers into unreadable pieces is",
        options: ["franking machine.", "guillotine machine.", "perforating machine.", "shredding machine."],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 16,
        questionText: "A diagram that shows the line of responsibilities and authorities in a company is",
        options: ["pie chart", "bar chart", "pictorial chart", "organizational chart"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 17,
        questionText: "A meeting conducted yearly by companies is",
        options: ["extra ordinary meeting", "staff meeting", "annual general meeting", "board meeting"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 18,
        questionText: "The department that is responsible for replenishing stock in an organization is the",
        options: ["purchasing department", "administrative department", "production department", "sales department"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 19,
        questionText: "An advantage of central filing is that it ensures",
        options: ["easy retrieval of files.", "easy access to files.", "high level of confidentiality.", "uniformity of filing system."],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 20,
        questionText: "Mails requiring prompt attention are",
        options: ["registered mails.", "personal mails.", "urgent mails.", "confidential mails"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 21,
        questionText: "Which of the following equipment is used for electronic filing?",
        options: ["Printer", "Fax Machine", "Computer", "Drawer"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 22,
        questionText: "The correspondence conveying the same information to different organization is/are",
        options: ["business letter", "memorandum", "minutes", "circulars"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 23,
        questionText: "The list of items to be discussed in a meeting is",
        options: ["amendment", "agenda", "resolution", "motion"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 24,
        questionText: "Which of the following factors will be considered before buying office furniture?",
        options: ["The colour of the furniture", "The size of the furniture", "The weight of the furniture", "The source of the furniture"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 25,
        questionText: "The principles of organization which states that a worker should not take orders from more than one superior officer is",
        options: ["unity of objective", "chain of command", "span of control", "unity of purpose"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 26,
        questionText: "One of the ways a receptionist show pleasantries to visitors is by",
        options: ["standing up to greet them", "welcoming all visitors with a smile", "welcoming them with a big hug", "asking about their families"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 27,
        questionText: "One of the advantages of a close office layout is that it",
        options: ["enhances the prestige of the user.", "ensures free flow of work.", "makes supervision of workers easier.", "enables common use of office equipment."],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 28,
        questionText: "Particulars of letters sent out from an office are entered in the",
        options: ["dispatch book.", "postage book.", "remittance book.", "office diary"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 29,
        questionText: "A requirement of a valid meeting is that",
        options: ["some proxies should be in attendance.", "there should be a quorum.", "all members should be in attendance.", "items of its agenda should be completed"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 30,
        questionText: "A filing system where records are kept by various section within an organization is",
        options: ["centralized filing system.", "geographical filing system.", "numerical filing system.", "departmental filing system."],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 31,
        questionText: "The term office equipment refers to",
        options: ["machine and furniture.", "wires and cables.", "furniture and fittings.", "machines and products"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 32,
        questionText: "Which of the following document is not used for business transaction?",
        options: ["price list", "quotation", "circular", "invoice"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 33,
        questionText: "The opinion of an investigatory committee on its findings is stated in the report as",
        options: ["introduction", "terms of reference", "conclusion", "recommendation"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 34,
        questionText: "One of the disadvantages of numerical system of filing is that",
        options: ["document retrieval takes longer time", "there may be congestion in a file", "there is difficulty of classification", "there is difficulty of document retrieval where date is unknown"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 35,
        questionText: 'The abbreviation "ref" on the letterhead of an organization represents',
        options: ["refferer", "referee", "reference", "referendum"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 36,
        questionText: "A filing classification in which documents are stored according to their title is",
        options: ["numerical filing", "alpha-numerical filing", "geographical filing", "subject filing"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 37,
        questionText: "A good information should be",
        options: ["relevant", "voluminous", "costly", "archived"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 38,
        questionText: "Economy in the use of office equipment is one of the advantages of",
        options: ["panoramic office.", "closed office.", "departmental office.", "open office"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 39,
        questionText: "Formal meeting held by the directors of an organization to consider policy issues is",
        options: ["statutory meeting", "general meeting", "board meeting", "committee meeting"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 40,
        questionText: "Which of the following types of correspondence is used to convey information to a large number of customers?",
        options: ["Bulleting", "Memorandum", "Circular letters", "Personal letters"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 41,
        questionText: "The part of a report where the highlights of an investigatory committee's assignment are stated is the",
        options: ["terms of reference", "body", "findings", "conclusion"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 42,
        questionText: "An example of open office in a school is the",
        options: ["principal's office", "staff room", "bursar's office", "security post"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 43,
        questionText: "One of the duties of a mail room clerk is to",
        options: ["sort outgoing mail into department.", "ensure that enclosures are attached to outgoing mail.", "give advance notice to addresses of incoming mail.", "return uncleared letters to the writers"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 44,
        questionText: "Standardized letters which give the same information and reply to regular inquires and requests are",
        options: ["personal letters", "confidential letters", "business letters", "form letters"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 45,
        questionText: "The use of a picture to convey information to receiver is an example of",
        options: ["audio communication", "visual communication", "oral communication", "written communication"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 46,
        questionText: "The process of interpreting a received message is",
        options: ["ideation", "encoding", "decoding", "feedback"],
        correctAnswer: "C",
        instruction: null,
      },
      {
        questionNumber: 47,
        questionText: "The means of internal communication in an organization is",
        options: ["letter", "circular", "report", "catalogue"],
        correctAnswer: "B",
        instruction: null,
      },
      {
        questionNumber: 48,
        questionText: "A document from the seller to the buyer showing the date, description and quantity of goods supplies is",
        options: ["debit note", "requisition note", "credit note", "delivery note"],
        correctAnswer: "D",
        instruction: null,
      },
      {
        questionNumber: 49,
        questionText: "In an organization, a receptionist may sometimes act as",
        options: ["a telephonist", "an office supervisor", "a secretary", "a marketing officer"],
        correctAnswer: "A",
        instruction: null,
      },
      {
        questionNumber: 50,
        questionText: "The tenure of an ad-hoc committee is",
        options: ["six month only", "one year only", "the period of its assignment", "determined by the chairman"],
        correctAnswer: "C",
        instruction: null,
      },
    ];

    console.log(`Attempting to seed ${officePracticeQuestions.length} Office Practice questions...`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const q of officePracticeQuestions) {
      try {
        // Check if question already exists
        const existing = await db
          .select()
          .from(questions)
          .where(
            and(
              eq(questions.subjectId, subjectId),
              eq(questions.questionNumber, q.questionNumber)
            )
          );

        if (existing.length > 0) {
          console.log(`Question ${q.questionNumber} already exists, skipping...`);
          skipCount++;
          continue;
        }

        // Validate question data
        if (!q.questionText || q.questionText.trim() === "") {
          console.error(`Question ${q.questionNumber}: Empty question text`);
          errorCount++;
          continue;
        }

        if (!q.options || q.options.length !== 4) {
          console.error(`Question ${q.questionNumber}: Invalid options array (expected 4, got ${q.options?.length || 0})`);
          errorCount++;
          continue;
        }

        if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
          console.error(`Question ${q.questionNumber}: Invalid correct answer "${q.correctAnswer}"`);
          errorCount++;
          continue;
        }

        // Insert question
        await db.insert(questions).values({
          subjectId,
          questionNumber: q.questionNumber,
          questionText: q.questionText,
          optionA: q.options[0],
          optionB: q.options[1],
          optionC: q.options[2],
          optionD: q.options[3],
          correctOption: q.correctAnswer,
          instruction: q.instruction,
        });

        successCount++;
        console.log(`✓ Seeded question ${q.questionNumber}`);
      } catch (error) {
        console.error(`Error seeding question ${q.questionNumber}:`, error);
        errorCount++;
      }
    }

    console.log("\n=== Office Practice Seeding Summary ===");
    console.log(`Total questions: ${officePracticeQuestions.length}`);
    console.log(`Successfully seeded: ${successCount}`);
    console.log(`Skipped (already exist): ${skipCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log("=====================================\n");

    if (errorCount > 0) {
      throw new Error(`Seeding completed with ${errorCount} errors`);
    }

    console.log("Office Practice seeding completed successfully!");
  } catch (error) {
    console.error("Error in Office Practice seeding:", error);
    throw error;
  }
}

// Run the seed function
seedOfficePractice()
  .then(() => {
    console.log("Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
