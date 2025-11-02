import { db } from "./db";
import { questions, subjects } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedLiteratureQuestions() {
  try {
    // Get Literature in English subject
    const literatureSubject = await db.query.subjects.findFirst({
      where: eq(subjects.name, "Literature in English"),
    });

    if (!literatureSubject) {
      console.error("Literature in English subject not found");
      return;
    }

    // Passage instructions
    const passage9to10 = `Read the extract below and answer questions 9 to 10

A little learning is a dangerous thing:
Drink deep, or taste not the Pierian Spring
The shallow droughts intoxicate the brain
And drinking largely sobers us again.`;

    const passage21to25 = `PART II - UNSEEN PROSE AND POETRY

Read the passage below and answer questions 21 to 25

Marooned, Akpause felt imprisoned. It was fifteen days since the storm. The flood waters were not receding; neither did Akpause see any sign of help coming. Akpause could not swim the expanse of flood waters. He meditated.

When one looks upon the mountain for help and help comes from the Lord... where does the Lord sit - in the cloud or on the mountain, or in the valley?

Well, Akpause looked for salvation in the distance, far across the ocean of flood - the intimidating expanse of his great gaoler - up to where the sky and the lips of the flood waters met in a mocking kiss. He had forgotten the feeling of hunger but knew he did not have any energy. What a foolish thing to think! He had not had any food for days. True. But hunger never said hello from the hollow of his 'person-tree' as they say in his language... Akpause saw no help coming.`;

    const passage26to30 = `Read the poem below and answer questions 26 to 30

Your lies are the wintering strokes still, they come from the inner recesses of your dungeoned heart. And though venomous than the venom, they inspire our ones doomed minds to disorders even as your angels of death pass us by with messages of hopeless hope.

Did you read our mind in your lies? We know the seat of power in a castle of your evil heart; where your lies are imprisoned to be released again and again; they are never in rain! But they have soothed us calmly, your lies, the war is not of you anymore, it is of the angels who pass us by with messages of peace.`;

    const passage31to35 = `SECTION B

WILLIAM SHAKESPEARE: A MIDSUMMER NIGHT'S DREAM

Read the extract below and answer questions 31 to 35

Go, Philostrate,
Stir up the Athenian youth to merriments;
Awake the pert and nimble spirit of mirth;
Turn melancholy forth to funerals:
The pale companion is not for our pomp.

Hippolyta, I wooed thee with my sword,
And won thy love doing thee injuries;
But I will wed thee in another key,
With pomp with triumph, and with revelling.
(Act I, Scene One, Lines 12-20)`;

    const passage36to40 = `Read the extract below and answer questions 36 to 40

Speaker X: Thou runaway, thou coward, art thou fled?
Speak! In some bush? Where dost thou hide thy head?

Speaker Y: Thou coward, art thou bragging to the stars,
Telling the bushes that thou look at for wars.
And wilt not come? Come, recreant, come, thou child;
I'll whip thee with a rod. He is defiled
That draws a sword on thee.

(Act III, Scene Two, Lines 403 - 411)`;

    const passage41to45 = `Read the extract below and answer questions 41 to 45

...seest thou this sweet sight?
Her dotage now I do begin to pity.
For meeting her of late behind the wood,
Seeking sweet favours for this hateful fool,
I did upbraid her, and fall out with her.

For she his hairy temples then had rounded
With coronet of fresh and fragrant flowers;
(Act IV, Scene One, Lines 42 - 48)`;

    const passage46to50 = `Read the extract below and answer questions 46 to 50

...Man is but an ass if he go about to expound this dream. Methought I was - there is no man can tell what. Methought I was, and methought I had - but man is but a patched fool, if he will offer to say what methought I had. The eye of man hath not heard, the ear of man hath not seen, man's hand is not able to taste, his tongue to conceive, nor his heart to report, what my dream was.

(Act IV, Scene One, Lines 201 - 207)`;

    const literatureQuestions = [
      { num: 1, text: "A novel that features spiritual apparitions as major character is", optionA: "epistolary.", optionB: "gothic.", optionC: "historical.", optionD: "sociological.", correctOption: "B", instruction: null },
      { num: 2, text: "The literary term describing individuals in a work of literature is", optionA: "character.", optionB: "protagonist.", optionC: "narrator.", optionD: "villain.", correctOption: "A", instruction: null },
      { num: 3, text: "Several hands stretched out for free meals at the refugee camp illustrates", optionA: "antithesis.", optionB: "euphemism.", optionC: "litotes.", optionD: "synecdoche.", correctOption: "D", instruction: null },
      { num: 4, text: "A short play performed between the acts of a bigger play for entertainment is", optionA: "an in media res.", optionB: "an interlude.", optionC: "an incantation.", optionD: "a deux-ex-machina.", correctOption: "B", instruction: null },
      { num: 5, text: "In literature, the two components of diction are", optionA: "sentence construction and punctuation.", optionB: "vocabulary and punctuation.", optionC: "syntax and sentence construction.", optionD: "vocabulary and syntax.", correctOption: "D", instruction: null },
      { num: 6, text: "A story with elements that have both literal and figurative meanings is", optionA: "an allegory.", optionB: "a fable.", optionC: "a novela.", optionD: "an epistle.", correctOption: "A", instruction: null },
      { num: 7, text: "My bounty is as boundless as the sea My love as deep. The above lines illustrate:", optionA: "apostrophe.", optionB: "epigram.", optionC: "hyperbole.", optionD: "euphemism.", correctOption: "C", instruction: null },
      { num: 8, text: "In drama, catharsis is the", optionA: "change of setting.", optionB: "conflict between two characters.", optionC: "resolution of conflict.", optionD: "purging of emotion from tension.", correctOption: "D", instruction: null },
      { num: 9, text: "9.", optionA: "allegoric.", optionB: "didactic.", optionC: "metaphysical.", optionD: "romantic.", correctOption: "B", instruction: passage9to10 },
      { num: 10, text: "10.", optionA: "jocular.", optionB: "harsh.", optionC: "mournful.", optionD: "sombre.", correctOption: "D", instruction: passage9to10 },
      { num: 11, text: "Lines 3 and 4 illustrate", optionA: "antithesis.", optionB: "oxymoron.", optionC: "anti-climax.", optionD: "metonymy.", correctOption: "A", instruction: null },
      { num: 12, text: "A word or a phrase that is repeated at regular intervals in a poem or a play is a", optionA: "dirge.", optionB: "refrain.", optionC: "lullaby.", optionD: "verse.", correctOption: "B", instruction: null },
      { num: 13, text: "The warriors conquered my men and my country illustrates the use of", optionA: "paradox.", optionB: "litotes.", optionC: "parallelism.", optionD: "zeugma.", correctOption: "D", instruction: null },
      { num: 14, text: "Disguise in drama mostly portrays the theme of", optionA: "known identity.", optionB: "plain identity.", optionC: "unknown identity.", optionD: "mistaken identity.", correctOption: "D", instruction: null },
      { num: 15, text: "Men swift to see things done, do not run their commanding. The underlined words exemplify", optionA: "pun.", optionB: "end rhyme.", optionC: "paradox.", optionD: "internal rhyme.", correctOption: "D", instruction: null },
      { num: 16, text: "An aside in drama is used mostly to create a sense of", optionA: "admiration.", optionB: "conspiracy.", optionC: "greatness.", optionD: "superiority.", correctOption: "B", instruction: null },
      { num: 17, text: "More taste, less speed illustrates the use of", optionA: "anaphora.", optionB: "paradox.", optionC: "litotes.", optionD: "synecdoche.", correctOption: "B", instruction: null },
      { num: 18, text: "Poetry gets bored of being alone. It wants to go outdoors to chew the winds. The mental picture evoked in the above lines is", optionA: "smell and touch.", optionB: "sight and hearing.", optionC: "taste and touch.", optionD: "sight and taste.", correctOption: "C", instruction: null },
      { num: 19, text: "A novel that recounts the adventures of a likeable rogue is", optionA: "panegyric.", optionB: "gothic.", optionC: "picaresque.", optionD: "grotesque.", correctOption: "C", instruction: null },
      { num: 20, text: "At the fall of their house, the widow lost her husband, her sewing machine and her ear-rings illustrates", optionA: "bathos.", optionB: "epigram.", optionC: "pathos.", optionD: "oxymoron.", correctOption: "A", instruction: null },
      { num: 21, text: "21.", optionA: "1st person.", optionB: "dialogue.", optionC: "3rd person.", optionD: "stream of consciousness.", correctOption: "C", instruction: passage21to25 },
      { num: 22, text: "22.", optionA: "allusion.", optionB: "irony.", optionC: "parallelism.", optionD: "antithesis.", correctOption: "A", instruction: passage21to25 },
      { num: 23, text: "23.", optionA: "contrast.", optionB: "euphemism.", optionC: "personification.", optionD: "litotes.", correctOption: "C", instruction: passage21to25 },
      { num: 24, text: "24.", optionA: "anger.", optionB: "empathy.", optionC: "love.", optionD: "relief.", correctOption: "B", instruction: passage21to25 },
      { num: 25, text: "25.", optionA: "anxiety.", optionB: "despondency.", optionC: "excitement.", optionD: "nonchalance.", correctOption: "B", instruction: passage21to25 },
      { num: 26, text: "26.", optionA: "evil of lying.", optionB: "hopeless hope.", optionC: "message of peace.", optionD: "message of war.", correctOption: "A", instruction: passage26to30 },
      { num: 27, text: "27.", optionA: "contentment.", optionB: "helplessness.", optionC: "patience.", optionD: "resilience.", correctOption: "B", instruction: passage26to30 },
      { num: 28, text: "28.", optionA: "personification.", optionB: "oxymoron.", optionC: "pathetic fallacy.", optionD: "rhetorical question.", correctOption: "D", instruction: passage26to30 },
      { num: 29, text: "29.", optionA: "paradox.", optionB: "irony.", optionC: "synecdoche.", optionD: "zeugma.", correctOption: "B", instruction: passage26to30 },
      { num: 30, text: "30.", optionA: "negative but similar ideas.", optionB: "opposite ideas.", optionC: "positive but opposite ideas.", optionD: "similar ideas.", correctOption: "B", instruction: passage26to30 },
      { num: 31, text: "31.", optionA: "Demetrius", optionB: "Egeus", optionC: "Hermia", optionD: "Theseus", correctOption: "D", instruction: passage31to35 },
      { num: 32, text: "32.", optionA: "Crown of Hippolyta.", optionB: "Duke's entertainer.", optionC: "Fairy king's cuckold.", optionD: "Rival of Puck.", correctOption: "B", instruction: passage31to35 },
      { num: 33, text: "33.", optionA: "adoration.", optionB: "dislike.", optionC: "intolerance.", optionD: "tolerance.", correctOption: "C", instruction: passage31to35 },
      { num: 34, text: "34.", optionA: "Egeus departs.", optionB: "Flute arrives.", optionC: "the fairies sing.", optionD: "Philostrate departs.", correctOption: "D", instruction: passage31to35 },
      { num: 35, text: "35.", optionA: "disowned his friends.", optionB: "had to fight against her.", optionC: "killed his father.", optionD: "sent Puck away.", correctOption: "B", instruction: passage31to35 },
      { num: 36, text: "36.", optionA: "Demetrius and Lysander", optionB: "Egeus and Puck", optionC: "Lysander and Demetrius", optionD: "Puck and Oberon", correctOption: "A", instruction: passage36to40 },
      { num: 37, text: "37.", optionA: "dawn.", optionB: "dusk.", optionC: "midday.", optionD: "midnight.", correctOption: "D", instruction: passage36to40 },
      { num: 38, text: "38.", optionA: "jocular.", optionB: "mocking.", optionC: "romantic.", optionD: "sympathetic.", correctOption: "B", instruction: passage36to40 },
      { num: 39, text: "39.", optionA: "Speaker X.", optionB: "Speaker Y.", optionC: "Flute.", optionD: "Oberon.", correctOption: "A", instruction: passage36to40 },
      { num: 40, text: "40.", optionA: "couplets.", optionB: "free verse.", optionC: "quatrains.", optionD: "tercets.", correctOption: "A", instruction: passage36to40 },
      { num: 41, text: "41.", optionA: "Bottom.", optionB: "Demetrius.", optionC: "Oberon.", optionD: "Puck.", correctOption: "C", instruction: passage41to45 },
      { num: 42, text: "42.", optionA: "Bottom.", optionB: "Lysander.", optionC: "Puck.", optionD: "Titania.", correctOption: "D", instruction: passage41to45 },
      { num: 43, text: "43.", optionA: "Demetrius.", optionB: "Egeus.", optionC: "Hermia.", optionD: "Puck.", correctOption: "D", instruction: passage41to45 },
      { num: 44, text: "44.", optionA: "Demetrius.", optionB: "Egeus.", optionC: "Helena.", optionD: "Hermia.", correctOption: "C", instruction: passage41to45 },
      { num: 45, text: "45.", optionA: "contemptuous.", optionB: "happy.", optionC: "pitiful.", optionD: "sorrowful.", correctOption: "C", instruction: passage41to45 },
      { num: 46, text: "46.", optionA: "Bottom.", optionB: "Lysander.", optionC: "Puck.", optionD: "Titania.", correctOption: "A", instruction: passage46to50 },
      { num: 47, text: "47.", optionA: "a quarrel.", optionB: "a sword fight.", optionC: "a dream.", optionD: "a play.", correctOption: "C", instruction: passage46to50 },
      { num: 48, text: "48.", optionA: "arrogance.", optionB: "bewilderment.", optionC: "gratitude.", optionD: "joy.", correctOption: "B", instruction: passage46to50 },
      { num: 49, text: "49.", optionA: "hyperbole.", optionB: "irony.", optionC: "metaphor.", optionD: "synesthesia.", correctOption: "D", instruction: passage46to50 },
      { num: 50, text: "50.", optionA: "contemptuous.", optionB: "humorous.", optionC: "melancholic.", optionD: "sarcastic.", correctOption: "B", instruction: passage46to50 },
    ];

    let insertedCount = 0;
    let skippedCount = 0;

    for (const q of literatureQuestions) {
      // Check if question already exists
      const existing = await db.query.questions.findFirst({
        where: (questions, { and, eq }) =>
          and(
            eq(questions.subjectId, literatureSubject.id),
            eq(questions.questionNumber, q.num)
          ),
      });

      if (existing) {
        console.log(`⊘ Skipped question ${q.num} (already exists)`);
        skippedCount++;
        continue;
      }

      await db.insert(questions).values({
        subjectId: literatureSubject.id,
        questionNumber: q.num,
        questionText: q.text,
        instruction: q.instruction,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
      });

      console.log(`✓ Inserted question ${q.num}`);
      insertedCount++;
    }

    console.log(`\n✅ Literature in English seeding complete!`);
    console.log(`   Inserted: ${insertedCount} questions`);
    console.log(`   Skipped: ${skippedCount} questions (already exist)`);
  } catch (error) {
    console.error("Error seeding Literature questions:", error);
  }
}

seedLiteratureQuestions();
