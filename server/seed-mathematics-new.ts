import { db } from './db';
import { questions, subjects } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function seedMathematics() {
  console.log("Starting Mathematics questions seeding...");

  // Get Mathematics subject
  const [mathSubject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, "Mathematics"));

  if (!mathSubject) {
    console.error("Mathematics subject not found! Please seed subjects first.");
    return;
  }

  console.log(`Found Mathematics subject with ID: ${mathSubject.id}`);

  // Delete existing Mathematics questions
  await db
    .delete(questions)
    .where(eq(questions.subjectId, mathSubject.id));

  console.log("Deleted existing Mathematics questions");

  const mathQuestions = [
    {
      num: 1,
      text: "Evaluate, correct to four significant figures, (573.06 × 184.25).",
      a: "105600.00",
      b: "105622.00",
      c: "105500.00",
      d: "105532.00",
      answer: "B"
    },
    {
      num: 2,
      text: "Change 432₅ to a number in base three.",
      a: "10100₃",
      b: "11100₃",
      c: "11101₃",
      d: "10110₃",
      answer: "B"
    },
    {
      num: 3,
      text: "Given that A and B are sets such that n(A) = 8, n(B) = 12 and n(A ∩ B) = 3, find n(A ∪ B).",
      a: "15",
      b: "17",
      c: "20",
      d: "23",
      answer: "C"
    },
    {
      num: 4,
      text: "If (1/2) + (1/3) - (1/6) = y, find the value of y.",
      a: "4",
      b: "2",
      c: "-2",
      d: "-4",
      answer: "A"
    },
    {
      num: 5,
      text: "Evaluate 2³ × 5⁴ (mod 7).",
      a: "2",
      b: "3",
      c: "5",
      d: "6",
      answer: "D"
    },
    {
      num: 6,
      text: "If 8ⁿ⁺² = 16ⁿ⁻¹, find the value of n.",
      a: "2",
      b: "3",
      c: "4",
      d: "-1",
      answer: "A"
    },
    {
      num: 7,
      text: "A weaver bought a bundle of grass for ₦5,000 from which he made 8 mats. If each mat was sold for ₦1,500, find the percentage profit.",
      a: "240%",
      b: "140%",
      c: "120%",
      d: "40%",
      answer: "C"
    },
    {
      num: 8,
      text: "Find the 17th term of the Arithmetic Progression (A.P) -6, -1, 4, ... .",
      a: "-91",
      b: "-86",
      c: "74",
      d: "79",
      answer: "D"
    },
    {
      num: 9,
      text: "M varies directly as n and inversely as the square of p. If M = 3 when n = 2 and p = 1, find M in terms of n and p.",
      a: "M = 3n/(2p²)",
      b: "M = 2n/(3p²)",
      c: "M = 2n/(3p)",
      d: "M = 3n/2",
      answer: "A"
    },
    {
      num: 10,
      text: "If a = 2 and b = -3, find the value of [5b + (a + b)²]/[(a - b)²].",
      a: "0.51",
      b: "0.19",
      c: "-0.19",
      d: "-0.51",
      answer: "B"
    },
    {
      num: 11,
      text: "Three boys shared ₦10,500.00 in the ratio 6:7:8. Find the largest share.",
      a: "₦4,000.00",
      b: "₦5,000.00",
      c: "₦4,500.00",
      d: "₦3,500.00",
      answer: "C"
    },
    {
      num: 12,
      text: "The length of a piece of stick is 1.75 m. A boy measured it as 1.80 m; Find the percentage error.",
      a: "4 5/7%",
      b: "2 6/7%",
      c: "2 7/9%",
      d: "4 7/9%",
      answer: "B"
    },
    {
      num: 13,
      text: "If 5x + 3y = 4 and 5x - 3y = 2, what is the value of 25x² - 9y²?",
      a: "20",
      b: "16",
      c: "8",
      d: "8",
      answer: "A"
    },
    {
      num: 14,
      text: "Mary has $3.00 more than Ben but $5.00 less than Jane. If Mary has $x, how much does Jane and Ben have altogether?",
      a: "$(2x - 8)",
      b: "$(2x + 8)",
      c: "$(2x - 2)",
      d: "$(2x + 2)",
      answer: "B"
    },
    {
      num: 15,
      text: "Consider the statements: p. Stephen is intelligent; q. Stephen is good at Mathematics. If p ⇒ q, which of the following is a valid conclusion?",
      a: "If Stephen is good at Mathematics, then he is intelligent",
      b: "If Stephen is not good at Mathematics, then he is not intelligent",
      c: "If Stephen is not intelligent, then he is not good at Mathematics",
      d: "If Stephen is not good at Mathematics, then he is intelligent",
      answer: "C"
    },
    {
      num: 16,
      text: "What value of p will make x² - 4x + p a perfect square?",
      a: "-2",
      b: "16",
      c: "4",
      d: "-8",
      answer: "C"
    },
    {
      num: 17,
      text: "Find the value of x such that (1/x) + (4/3x) = (5/6x) + (1/x) is zero.",
      a: "1",
      b: "14",
      c: "32",
      d: "76",
      answer: "B"
    },
    {
      num: 18,
      text: "A boy 1.4 m tall, stood 10 m away from a tree of height 12 m. Calculate, correct to the nearest degree, the angle of elevation of the top of the tree from the boy's eyes.",
      a: "71°",
      b: "47°",
      c: "19°",
      d: "8°",
      answer: "B"
    },
    {
      num: 19,
      text: "Given that sin(5x - 28)° = cos(3x - 50)°, 0° < x < 90°, find the value of x.",
      a: "39",
      b: "32",
      c: "21",
      d: "14",
      answer: "A"
    },
    {
      num: 20,
      text: "Mrs Gabriel is pregnant. The probability that she will give birth to a girl is 1/2 and the probability that the baby will have blue eyes is 1/4. What is the probability that she will give birth to a girl with blue eyes?",
      a: "1/8",
      b: "2/4",
      c: "1/8",
      d: "1/4",
      answer: "A"
    },
    {
      num: 21,
      text: "Solve: (y + 2)/4 - (y - 1)/3 > 1.",
      a: "y < -10",
      b: "y < -2",
      c: "y < 2",
      d: "y < 10",
      answer: "B"
    },
    {
      num: 22,
      text: "The ages (years) of some members in a singing group are: 12, 47, 49, 15, 43, 41, 13, 39, 43, 41 and 36. Find the lower quartile.",
      a: "12",
      b: "13",
      c: "15",
      d: "20",
      answer: "C"
    },
    {
      num: 23,
      text: "Using the same data, find the mean.",
      a: "33.35",
      b: "35.54",
      c: "34.45",
      d: "36.44",
      answer: "B"
    },
    {
      num: 24,
      text: "Find, correct to two decimal places, the volume of a sphere whose radius is 3 cm. [Take π = 22/7]",
      a: "72.57 cm³",
      b: "88.12 cm³",
      c: "105.29 cm³",
      d: "113.14 cm³",
      answer: "D"
    },
    {
      num: 25,
      text: "The lengths of the parallel sides of a trapezium are 9 cm and 12 cm. If the area of the trapezium is 105 cm², find the perpendicular distance between the parallel sides.",
      a: "5 cm",
      b: "7 cm",
      c: "10 cm",
      d: "15 cm",
      answer: "C"
    },
    {
      num: 26,
      text: "Find the volume of a cone of radius 3.5 cm and vertical height 12 cm. [Take π = 22/7]",
      a: "15.5 cm³",
      b: "21.0 cm³",
      c: "12.0 cm³",
      d: "15.0 cm³",
      answer: "B"
    },
    {
      num: 27,
      text: "A local community has two newspapers: the Morning Times and the Evening Dispatch. The Morning Times is read by 45% of households and the Evening Dispatch by 60%. If 20% of the households read both papers, find the probability that a particular household reads at least one paper.",
      a: "0.15",
      b: "0.65",
      c: "0.85",
      d: "0.95",
      answer: "C"
    },
    {
      num: 28,
      text: "A rectangle has width 3 cm and an area 13.5 cm². Find the length.",
      a: "6 cm",
      b: "4.5 cm",
      c: "2.5 cm",
      d: "1.5 cm",
      answer: "A"
    },
    {
      num: 29,
      text: "The mean of two numbers x and y is 5. If their mean is 8, find x + y.",
      a: "2",
      b: "4",
      c: "6",
      d: "8",
      answer: "D"
    },
    {
      num: 30,
      text: "The straight line y = mx - 4 passes through the point (4, 16). Calculate the gradient of the line.",
      a: "5",
      b: "3",
      c: "3",
      d: "5",
      answer: "A"
    },
    {
      num: 31,
      text: "If the equations x² - 5x + 6 = 0 and x² + px + 6 = 0 have common roots, find the value of p.",
      a: "5",
      b: "6",
      c: "-6",
      d: "-5",
      answer: "D"
    },
    {
      num: 32,
      text: "A trader made a loss of 15% when an article was sold. Find the ratio of the selling price to the cost price.",
      a: "3:20",
      b: "3:17",
      c: "17:20",
      d: "20:23",
      answer: "C"
    },
    {
      num: 33,
      text: "Given that log₂(2y) = 2x + 1, find the value of y.",
      a: "0",
      b: "1",
      c: "2",
      d: "3",
      answer: "D"
    },
    {
      num: 34,
      text: "Solve 6x² = 5x - 1.",
      a: "x = 1/2, 1/3",
      b: "x = 1/3, 1/2",
      c: "x = 1/2, 1/3",
      d: "x = 1/3, 1/2",
      answer: "A"
    },
    {
      num: 35,
      text: "Arrange the following fractions in ascending order: 3/4, 3/5, 2/3.",
      a: "2/3, 3/4, 3/5",
      b: "3/5, 2/3, 3/4",
      c: "3/4, 2/3, 3/5",
      d: "3/5, 3/4, 2/3",
      answer: "B"
    },
    {
      num: 36,
      text: "Find the product of 243₅ and 14₅.",
      a: "10112₅",
      b: "11012₅",
      c: "10102₅",
      d: "11102₅",
      answer: "B"
    },
    {
      num: 37,
      text: "Given that 13ʸ × 27ʸ = 9²ʸ, find y.",
      a: "-2",
      b: "-1",
      c: "1",
      d: "2",
      answer: "C"
    },
    {
      num: 38,
      text: "Given that M = {x ∈ N; x > 3} and N = {x ∈ N; x < 7}, find M ∩ N.",
      a: "{4}",
      b: "{3, 4, 6}",
      c: "{4, 5, 6}",
      d: "{5, 6}",
      answer: "C"
    },
    {
      num: 39,
      text: "Evaluate: 16^(3/2) + log₁₀ 0.0001 + log₂ 32.",
      a: "63",
      b: "64",
      c: "65",
      d: "66",
      answer: "B"
    },
    {
      num: 40,
      text: "If (3x + 2y) : (3x + 4y) = 3 : 5, find x : y.",
      a: "1 : 3",
      b: "2 : 5",
      c: "3 : 1",
      d: "5 : 3",
      answer: "C"
    },
    {
      num: 41,
      text: "Given that P varies inversely as √q and P = 12 when q = 9, find the value of q when P = 24.",
      a: "128/49",
      b: "32/49",
      c: "64/49",
      d: "16/49",
      answer: "C"
    },
    {
      num: 42,
      text: "In a class of 40 students, (8 - 3x) read Chemistry and 12 read Physics only. If 5 students read neither Chemistry nor Physics, find the value of x.",
      a: "5",
      b: "6",
      c: "10",
      d: "15",
      answer: "B"
    },
    {
      num: 43,
      text: "A bicycle wheel of radius 30 cm turns through 100 revolutions. Find, in metres, the distance travelled. [Take π = 22/7]",
      a: "188.6",
      b: "168.5",
      c: "138.5",
      d: "128.7",
      answer: "A"
    },
    {
      num: 44,
      text: "Find the gradient of the line passing through the points P(1, -1/2) and Q(-3, -8/2).",
      a: "-3",
      b: "-2",
      c: "2",
      d: "3",
      answer: "A"
    },
    {
      num: 45,
      text: "A number is chosen at random from the set {35, 36, 37, 38, 39, 40, 41 and 42}. What is the probability that the number is a multiple of 7?",
      a: "1/8",
      b: "1/7",
      c: "1/4",
      d: "1/5",
      answer: "B"
    },
    {
      num: 46,
      text: "The sum of the angles of a regular polygon is 2520°. How many sides does the polygon have?",
      a: "20",
      b: "16",
      c: "15",
      d: "17",
      answer: "A"
    },
    {
      num: 47,
      text: "Find the gradient of the line 3x - 2y = 6.",
      a: "3",
      b: "-2",
      c: "3/2",
      d: "-3/2",
      answer: "C"
    },
    {
      num: 48,
      text: "In the diagram, P is the centre of the circle MNRS and ∠MNR = 52°. Find the size of the reflex angle MPR.",
      a: "256°",
      b: "128°",
      c: "108°",
      d: "52°",
      answer: "A"
    },
    {
      num: 49,
      text: "The angle of a sector of a circle is 108°. If the radius of the circle is 3.5 cm, find the perimeter of the sector. [Take π = 22/7]",
      a: "15.6 cm",
      b: "9.6 cm",
      c: "10.6 cm",
      d: "12.6 cm",
      answer: "A"
    },
    {
      num: 50,
      text: "A class consists of 21 boys and 15 girls who compete for a prize. Find the probability that a boy takes the first prize and a girl the second prize.",
      a: "1/4",
      b: "1/5",
      c: "1/6",
      d: "1/7",
      answer: "C"
    }
  ];

  // Insert questions
  for (const q of mathQuestions) {
    await db.insert(questions).values({
      subjectId: mathSubject.id,
      questionNumber: q.num,
      questionText: q.text,
      optionA: q.a,
      optionB: q.b,
      optionC: q.c,
      optionD: q.d,
      correctOption: q.answer
    });
  }

  console.log(`✅ Successfully seeded ${mathQuestions.length} Mathematics questions!`);
}

seedMathematics()
  .then(() => {
    console.log("Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding Mathematics questions:", error);
    process.exit(1);
  });
