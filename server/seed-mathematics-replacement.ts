import { db } from './db';
import { questions, subjects } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function seedMathematics() {
  console.log('Starting to replace Mathematics questions...');

  // Find Mathematics subject
  const [mathSubject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, 'Mathematics'));

  if (!mathSubject) {
    console.error('Mathematics subject not found!');
    return;
  }

  console.log(`Found Mathematics subject: ${mathSubject.id}`);

  // Delete existing Mathematics questions
  await db.delete(questions).where(eq(questions.subjectId, mathSubject.id));
  console.log('Deleted existing Mathematics questions');

  const mathQuestions = [
    {
      num: 1,
      text: "Multiply 3.4 × 10⁻⁵ by 7.1 × 10⁸ and leave the answer in the standard form.",
      a: "2.414 × 10²",
      b: "2.414 × 10³",
      c: "2.414 × 10⁴",
      d: "2.414 × 10⁵",
      answer: "C"
    },
    {
      num: 2,
      text: "Given that P = {p : 1 < p < 20}, where p is an integer and R = {r : 0 ≤ r ≤ 25, where r is a multiple of 4}. Find P ∩ R.",
      a: "{4, 8, 10, 16}",
      b: "{4, 8, 12, 16}",
      c: "{4, 8, 12, 16, 20}",
      d: "{4, 8, 12, 16, 20, 24}",
      answer: "B"
    },
    {
      num: 3,
      text: "The first term of an arithmetic progression is 2 and the last term is 29. If the common difference is 3, how many terms are in the arithmetic progression?",
      a: "8",
      b: "9",
      c: "10",
      d: "11",
      answer: "C"
    },
    {
      num: 4,
      text: "A boy 1.4 m tall, stood 10 m away from a tree of height 12 m. Calculate, correct to the nearest degree, the angle of elevation of the top of the tree from the boy's eyes.",
      a: "70°",
      b: "47°",
      c: "19°",
      d: "8°",
      answer: "B"
    },
    {
      num: 5,
      text: "Simplify: (2p − q)² − (p + q)².",
      a: "3p(p − 2q)",
      b: "2p(p − 3q)",
      c: "3p(2p − q)",
      d: "2p(3p − q)",
      answer: "A"
    },
    {
      num: 6,
      text: "A ladder 6 m long leans against a vertical wall at an angle 53° to the horizontal. How high up the wall does the ladder reach?",
      a: "3.611 m",
      b: "4.521 m",
      c: "4.792 m",
      d: "3.962 m",
      answer: "C"
    },
    {
      num: 7,
      text: "Find the sum for which $1,250.00 will amount to $2,031.25 at 12.5% per annum simple interest.",
      a: "2 years",
      b: "3 years",
      c: "4 years",
      d: "5 years",
      answer: "D"
    },
    {
      num: 8,
      text: "If log₂x⁻¹ = 5, find the value of x.",
      a: "8",
      b: "16",
      c: "64",
      d: "122",
      answer: "C"
    },
    {
      num: 9,
      text: "The population of a town increases by 3% every year. In the year 2000, the population was 3000. Find the population in the year 2003.",
      a: "3278",
      b: "3127",
      c: "3556",
      d: "3618",
      answer: "A"
    },
    {
      num: 10,
      text: "A trader gave a change of N 540.00 instead of N 570.00 to a customer. Calculate the percentage error.",
      a: "5⁵⁄₁₉%",
      b: "5⁵⁄₉%",
      c: "5⁷⁄₁₉%",
      d: "5⁷⁄₉%",
      answer: "A"
    },
    {
      num: 11,
      text: "The interior angle of a regular polygon is 168°. Find the number of sides of the polygon.",
      a: "24",
      b: "30",
      c: "15",
      d: "12",
      answer: "B"
    },
    {
      num: 12,
      text: "If 3x − 2y = −5 and x + 2y = 9, find the value of (x + y)/(x − y).",
      a: "⁵⁄₃",
      b: "³⁄₅",
      c: "−³⁄₅",
      d: "−⁵⁄₃",
      answer: "C"
    },
    {
      num: 13,
      text: "A variable W varies partly as M and partly inversely as P. Which of the following correctly represents the relation with k₁ and k₂ constants?",
      a: "W = k₁M/k₂P",
      b: "W = (k₁ + k₂)M/P",
      c: "W = k₁M + k₂/P",
      d: "W = (k₁ + k₂)M + P",
      answer: "C"
    },
    {
      num: 14,
      text: "A cylindrical metallic barrel of height 2.5 m and radius 0.245 m is closed at one end. Find, correct to one decimal place, the total surface area of the barrel. [Take π = ²²⁄₇]",
      a: "2.1 m²",
      b: "3.5 m²",
      c: "4.0 m²",
      d: "9.4 m²",
      answer: "C"
    },
    {
      num: 15,
      text: "Find the 17th term of the arithmetic progression, given that first three terms are −6, −1, 4.",
      a: "91",
      b: "86",
      c: "74",
      d: "79",
      answer: "B"
    },
    {
      num: 16,
      text: "Consider the following statements: m = Edna is respectful, n = Edna is brilliant. If m ⇒ n, which of the following is valid?",
      a: "¬n ⇒ ¬m",
      b: "¬m ⇒ ¬n",
      c: "n ⇒ ¬m",
      d: "m ⇒ n",
      answer: "A"
    },
    {
      num: 17,
      text: "A number is added to both the numerator and the denominator of the fraction ¹⁄₈. If the result is ¹⁄₂, find the number.",
      a: "3",
      b: "4",
      c: "5",
      d: "6",
      answer: "D"
    },
    {
      num: 18,
      text: "Gifty, Justina, and Frank shared 60 oranges in the ratio 5:3:7 respectively. How many oranges did Justina receive?",
      a: "16",
      b: "12",
      c: "20",
      d: "28",
      answer: "B"
    },
    {
      num: 19,
      text: "Find the quadratic equation whose roots are 2 and −¹⁄₃.",
      a: "3x² − x − 2 = 0",
      b: "3x² + x + 2 = 0",
      c: "3x² + x − 2 = 0",
      d: "3x² + x − 1 = 0",
      answer: "C"
    },
    {
      num: 20,
      text: "A piece of rod of length 44 m is cut to form a rectangular shape such that the ratio of the length to the breadth is 7:4. Find the breadth.",
      a: "8 m",
      b: "14 m",
      c: "16 m",
      d: "24 m",
      answer: "A"
    },
    {
      num: 21,
      text: "In the diagram, MN || KL, ML and KN intersect at X. |MN| = 12 cm, |MX| = 10 cm and |KL| = 9 cm. If the area of ΔMXN is 16 cm², calculate the area of ΔLXK.",
      a: "9 cm²",
      b: "8 cm²",
      c: "10 cm²",
      d: "12 cm²",
      answer: "A",
      instruction: "![Diagram for Question 21](@assets/no 21_1762315568799.png)"
    },
    {
      num: 22,
      text: "A ladder 15 m long leans against a vertical pole, making an angle of 72° with the horizontal. Calculate, correct to one decimal place, the distance between the foot of the ladder and the pole.",
      a: "15.8 m",
      b: "14.3 m",
      c: "4.9 m",
      d: "4.6 m",
      answer: "D"
    },
    {
      num: 23,
      text: "In the diagram, O is the centre of the circle. If |OA| = 25 cm and |AB| = 40 cm, find |OH|.",
      a: "15 cm",
      b: "20 cm",
      c: "25 cm",
      d: "30 cm",
      answer: "A",
      instruction: "![Diagram for Question 23](@assets/no 23_1762315568809.png)"
    },
    {
      num: 24,
      text: "A car valued at $600,000.00 depreciates by 10% each year. What will be the value of the car at the end of two years?",
      a: "$120,000.00",
      b: "$480,000.00",
      c: "$486,000.00",
      d: "$540,000.00",
      answer: "C"
    },
    {
      num: 25,
      text: "Given that P is 25 m on a bearing of 330° from Q, how far south of P is Q?",
      a: "25.2 m",
      b: "21.7 m",
      c: "19.8 m",
      d: "18.5 m",
      answer: "B"
    },
    {
      num: 26,
      text: "The length and breadth of a cuboid are 15 cm and 8 cm respectively. If the volume of the cuboid is 1560 cm³, calculate the total surface area.",
      a: "976 cm²",
      b: "838 cm²",
      c: "792 cm²",
      d: "746 cm²",
      answer: "B"
    },
    {
      num: 27,
      text: "The number 1621 was subtracted from 6244 in base x. If the result was 4323, find x.",
      a: "7",
      b: "8",
      c: "9",
      d: "10",
      answer: "A"
    },
    {
      num: 28,
      text: "Factorize completely: 27x² − 48y².",
      a: "3(3x + 4y)(3x − 4y)",
      b: "3(3x + 4y)(3x + 4y)",
      c: "3(9x − 16y)(9x + 16y)",
      d: "3(9x − 16y)(9x − 16y)",
      answer: "A"
    },
    {
      num: 29,
      text: "For what values of x is (x − 3)/4 + (x + 1)/8 ≥ 2?",
      a: "x ≥ 5",
      b: "x ≥ 6",
      c: "x ≥ 7",
      d: "x ≥ 8",
      answer: "C"
    },
    {
      num: 30,
      text: "In the diagram, ∠SQR = 52° and ∠PRT = 16°. Find the value of the angle y.",
      a: "64°",
      b: "68°",
      c: "112°",
      d: "128°",
      answer: "A",
      instruction: "![Diagram for Question 30](@assets/no 30_1762315568810.png)"
    },
    {
      num: 31,
      text: "In the diagram above, JKL is a tangent to the circle at K, ∠LKG = 38°, ∠KIB = 87°. Find ∠KLG.",
      a: "93°",
      b: "55°",
      c: "42°",
      d: "23°",
      answer: "B",
      instruction: "![Diagram for Question 31](@assets/no 31_1762315568811.png)"
    },
    {
      num: 32,
      text: "A cone and a cylinder are of equal volume. The base radius of the cone is twice the radius of the cylinder. What is the ratio of the height of the cylinder to that of the cone?",
      a: "5:4",
      b: "4:3",
      c: "3:2",
      d: "3:4",
      answer: "B"
    },
    {
      num: 33,
      text: "Find, correct to the nearest whole number, the value of h in the diagram above.",
      a: "15 m",
      b: "22 m",
      c: "23 m",
      d: "18 m",
      answer: "C",
      instruction: "![Diagram for Question 33](@assets/no 33_1762315568811.png)"
    },
    {
      num: 34,
      text: "The gradient of the line joining the points P(2, −8) and Q(1, y) is −4. Find the value of y.",
      a: "2",
      b: "4",
      c: "−4",
      d: "−3",
      answer: "C"
    },
    {
      num: 35,
      text: "In the diagram above, PQ || RS, ∠WYZ = 44° and ∠WXY = 50°. Find ∠WTX.",
      a: "65°",
      b: "68°",
      c: "86°",
      d: "90°",
      answer: "C",
      instruction: "![Diagram for Question 35](@assets/no 35_1762315568812.png)"
    },
    {
      num: 36,
      text: "The perimeter of a rectangular garden is 90 m. If the width is 7 m less than the length, find the length of the garden.",
      a: "19 m",
      b: "23 m",
      c: "24 m",
      d: "26 m",
      answer: "D"
    },
    {
      num: 37,
      text: "Four of the angles of a hexagon sum up to 420°. If the remaining angles are equal, find the value of each of the angles.",
      a: "60°",
      b: "100°",
      c: "120°",
      d: "150°",
      answer: "D"
    },
    {
      num: 38,
      text: "Find the value of x in the diagram above.",
      a: "120°",
      b: "100°",
      c: "60°",
      d: "150°",
      answer: "A",
      instruction: "![Diagram for Question 38](@assets/no 38_1762315568812.png)"
    },
    {
      num: 39,
      text: "The following are the masses, in kg, of members in a club: 59, 44, 53, 49, 57, 40, 48, and 50. Calculate the mean mass.",
      a: "44 kg",
      b: "50 kg",
      c: "40 kg",
      d: "53 kg",
      answer: "B"
    },
    {
      num: 40,
      text: "The following are the masses, in kg, of members in a club: 59, 44, 53, 49, 57, 40, 48, and 50. Calculate the variance of the distribution.",
      a: "35",
      b: "36",
      c: "40",
      d: "50",
      answer: "A"
    },
    {
      num: 41,
      text: "Two opposite sides of a rectangle are (5x + 3) m and (2x + 9) m. If an adjacent side is (6x − 7) m, find, in m², the area of the rectangle.",
      a: "45",
      b: "65",
      c: "125",
      d: "165",
      answer: "B"
    },
    {
      num: 42,
      text: "A die is tossed once. Find the probability of getting a prime number.",
      a: "¹⁄₂",
      b: "¹⁄₆",
      c: "¹⁄₃",
      d: "²⁄₃",
      answer: "A"
    },
    {
      num: 43,
      text: "The area of a sector of a circle with radius 7 cm is 51.3 cm². Calculate, correct to the nearest whole number, the angle of the sector. [Take π = ²²⁄₇]",
      a: "60°",
      b: "120°",
      c: "150°",
      d: "150°",
      answer: "B"
    },
    {
      num: 44,
      text: "A cliff on the bank of a river 87 m high. A boat on the river is 22 m away from the cliff. Calculate, correct to the nearest degree, the angle of depression of the boat from the top of the cliff.",
      a: "76°",
      b: "64°",
      c: "36°",
      d: "24°",
      answer: "B"
    },
    {
      num: 45,
      text: "In the diagram, TU is a tangent to the circle at P. If ∠PTS = 44°, ∠SQP = 35°, find ∠PST.",
      a: "101°",
      b: "125°",
      c: "130°",
      d: "135°",
      answer: "B",
      instruction: "![Diagram for Question 45](@assets/no 45_1762315568813.png)"
    },
    {
      num: 46,
      text: "The probability that Amaka will pass an examination is ³⁄₇ and that Bala will pass is ⁴⁄₉. Find the probability that both will pass the examination.",
      a: "²⁄₂₁",
      b: "⁴⁄₂₁",
      c: "⁵⁄₂₁",
      d: "⁹⁄₂₁",
      answer: "B"
    },
    {
      num: 47,
      text: "Which of the following points lies on the line 3x − 8y = 11?",
      a: "(1, 1)",
      b: "(1, −1)",
      c: "(−1, 1)",
      d: "(−1, −1)",
      answer: "C"
    },
    {
      num: 48,
      text: "Find the range of the following set of numbers: 28, 29, 39, 38, 33, 37, 26, 20, 15, and 25.",
      a: "22",
      b: "24",
      c: "25",
      d: "27",
      answer: "B"
    },
    {
      num: 49,
      text: "The fourth and eighth terms of an arithmetic progression are 16 and 40 respectively. Find the common difference.",
      a: "−6",
      b: "6",
      c: "−2",
      d: "2",
      answer: "B"
    },
    {
      num: 50,
      text: "Given that sin(5x − 28)° = cos(3x − 50)°, 0° ≤ x ≤ 90°, find the value of x.",
      a: "39",
      b: "32",
      c: "21",
      d: "14",
      answer: "C"
    }
  ];

  // Insert all questions
  for (const q of mathQuestions) {
    const questionData: any = {
      subjectId: mathSubject.id,
      questionNumber: q.num,
      questionText: q.text,
      optionA: q.a,
      optionB: q.b,
      optionC: q.c,
      optionD: q.d,
      correctOption: q.answer
    };

    // Add instruction field for questions with diagrams
    if (q.instruction) {
      questionData.instruction = q.instruction;
    }

    await db.insert(questions).values(questionData);
  }

  console.log('✅ Successfully inserted all 50 Mathematics questions!');
}

seedMathematics()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding Mathematics:', error);
    process.exit(1);
  });
