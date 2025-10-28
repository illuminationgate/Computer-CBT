import { db } from './db';
import { subjects, questions } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getOrCreateSubject(name: string, duration: number, questionCount: number) {
  const [existing] = await db.select().from(subjects).where(eq(subjects.name, name));
  if (existing) {
    console.log(`Subject exists: ${name}`);
    return existing;
  }
  const [result] = await db.insert(subjects).values({ name, duration, questionCount }).returning();
  console.log(`Created subject: ${name}`);
  return result;
}

function validateQuestion(q: any[], hasE: boolean): boolean {
  const expectedLength = hasE ? 7 : 6;
  if (!Array.isArray(q) || q.length !== expectedLength) {
    console.error(`Invalid question array length. Expected ${expectedLength}, got ${q?.length}`);
    return false;
  }
  
  const validOptions = hasE ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D'];
  const correctAnswer = hasE ? q[6] : q[5];
  if (!validOptions.includes(correctAnswer)) {
    console.error(`Invalid correct answer: ${correctAnswer}. Must be one of ${validOptions.join(', ')}`);
    return false;
  }
  
  for (let i = 0; i <= (hasE ? 5 : 4); i++) {
    if (typeof q[i] !== 'string' || q[i].trim() === '') {
      console.error(`Question field at index ${i} is empty or not a string`);
      return false;
    }
  }
  
  return true;
}

async function insertQs(subjectId: string, qs: any[], hasE: boolean = false) {
  let inserted = 0, skipped = 0, num = 1;
  
  for (const q of qs) {
    if (!validateQuestion(q, hasE)) {
      console.error(`Skipping invalid question #${num}`);
      skipped++;
      continue;
    }
    
    try {
      const result = await db.insert(questions).values({
        subjectId,
        questionNumber: num,
        questionText: q[0],
        optionA: q[1],
        optionB: q[2],
        optionC: q[3],
        optionD: q[4],
        optionE: hasE ? q[5] : null,
        correctOption: hasE ? q[6] : q[5]
      }).onConflictDoNothing().returning();
      
      if (result && result.length > 0) {
        inserted++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`Error inserting question ${num}:`, error);
      skipped++;
    }
    num++;
  }
  
  console.log(`   Inserted: ${inserted}, Skipped: ${skipped}`);
  return { inserted, skipped };
}

async function seedFromJSON(filename: string, subjectName: string, duration: number, questionCount: number, hasE: boolean = false) {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, filename), 'utf-8'));
    const subject = await getOrCreateSubject(subjectName, duration, questionCount);
    console.log(`\nSeeding ${subjectName}...`);
    await insertQs(subject.id, data, hasE);
  } catch (error) {
    console.error(`Failed to seed ${subjectName}:`, error);
    throw error;
  }
}

async function seedInlineQuestions(subjectName: string, duration: number, qs: any[], hasE: boolean = false) {
  try {
    const subject = await getOrCreateSubject(subjectName, duration, qs.length);
    console.log(`\nSeeding ${subjectName}...`);
    await insertQs(subject.id, qs, hasE);
  } catch (error) {
    console.error(`Failed to seed ${subjectName}:`, error);
    throw error;
  }
}

async function seed() {
  console.log('🌱 Seeding all 8 new subjects (410 questions)...\n');

  try {
    // Commerce - inline questions (50)
    const commerceQs = [
      ["Commerce is defined as", "buying and selling of goods and services only.", "all activities in the distribution and exchange of goods and services.", "all activities involved in the production of goods and services.", "transporting and warehousing of goods only.", "B"],
      ["The types of occupation that a broker belongs to is", "commercial.", "construction.", "extraction.", "manufacturing.", "A"],
      ["A form of money which was not used in the early days to trade is", "tobacco.", "metal bars.", "cowries.", "coins.", "D"],
      ["Which of the following activities is not an example of the extractive industry?", "Weaving.", "Quarrying.", "Hunting.", "Fishing.", "A"],
      ["The factor of production which bear all the risk of the business is", "capital.", "entrepreneurship.", "labour.", "land.", "B"],
      ["Production is completed when product reach the", "warehouses.", "users.", "retailers.", "shops.", "B"],
      ["A partner whose name is used to boost the image of the business and does not contribute capital is a", "dormant partner.", "general partner.", "limited partner.", "nominal partner.", "D"],
      ["One advantage of sole proprietorship is that", "access to large capital is easy.", "decisions are made promptly.", "business risks are spread.", "continuity of business is assured.", "B"],
      ["A business unit in which savings of members are lent to others is a", "consumer cooperative society.", "producer cooperative society.", "credit and thrift society.", "wholesale cooperative society.", "C"],
      ["The document issued to a public company allowing it to commence business is the", "Article of Association.", "Certificate of Incorporation.", "Memorandum of Association.", "Certificate of Trading.", "D"],
      ["Which of the following is not a function of a consumer association?", "Ensuring that consumers buy quality goods", "Educating consumers on their rights", "Penalizing importers of fake goods", "Ensuring that fair prices are charged", "C"],
      ["An association formed by computer distributors to safeguard and promote their interest is a", "chamber of commerce.", "cooperative society.", "trade association.", "trade union.", "C"],
      ["The issue of prospectus by a company is an invitation to members of the public to", "subscribe to the company's shares.", "attend the company's Annual General Meeting.", "buy the company's product.", "attend the company's boards meeting.", "A"],
      ["Examples of current assets are", "cash and trade debtors.", "cash and trade creditors.", "trade debtors, trade creditors and cash.", "trade creditors and trade debtors.", "A"],
      ["When the cost of sales is divided by the average stock, the result is", "gross profit.", "net profit.", "rate of turnover.", "working capital.", "C"],
      ["The part of issued share capital that the company has asked the subscribers to pay for is", "authorized capital.", "called-up capital.", "nominal capital.", "paid-up capital.", "B"],
      ["The last link in a channel of distribution is the", "wholesaler.", "retailer.", "consumer.", "agent.", "C"],
      ["The difference between a country's imports and exports of goods in a particular year is", "terms of trade.", "terms of payment.", "balance of payment.", "balance of trade.", "D"],
      ["Goods brought into the country for sale are the country's", "invisible imports.", "invisible exports.", "visible imports.", "visible exports.", "C"],
      ["A feature of supermarkets which distinguishes it from other large scale retail outlets is that items sold are", "mainly household goods.", "mainly industrial goods.", "delivered by post.", "one line of products.", "A"],
      ["One advantage of small scale retail outlet is", "availability of self service facilities.", "ability to buy in bulk.", "easy access to large amount of capital.", "personal attention to customers.", "D"],
      ["A discount deducted from the invoice price of goods to enable the retailer to make profit is", "cash discount.", "functional discount.", "trade discount.", "seasonal discount.", "C"],
      ["A document issued by the seller's own courier and signed by the customer to acknowledge receipt of the goods is", "advice note.", "consignment note.", "delivery note.", "freight note.", "C"],
      ["A request for goods from another country by an importer would be made using", "an invoice.", "an indent.", "an order.", "a quotation.", "B"],
      ["The right to buy or sell stock in the stock exchange within a stipulated period is", "option.", "contango.", "backwardation.", "brokerage.", "A"],
      ["The share value stated on a share certificate is", "above par value.", "below par value.", "market value.", "nominal value.", "D"],
      ["The bank which acts as the lender of last resort is the", "Central bank.", "Commercial bank.", "Merchant bank.", "Mortgage bank.", "A"],
      ["The issue of shares which allows existing shareholder's to buy shares at a preferential price is", "bonus issue.", "offer for sale.", "public offer.", "rights issue.", "D"],
      ["The financial market where existing shares and bonds are bought and sold is the", "forex market.", "stock market.", "money market.", "commodity market.", "B"],
      ["An insurance policy which is not a contract of indemnity is", "burglary insurance.", "fire insurance.", "life insurance.", "motor insurance.", "C"],
      ["When a company insures the lives of all its employees collectively, the policy is", "accident insurance.", "fleet insurance.", "fidelity guarantee insurance.", "group insurance.", "D"],
      ["A cheque that could be cashed over the counter by the payee is", "certified cheque.", "crossed cheque.", "open cheque.", "bank draft.", "C"],
      ["The purpose of branding is", "to increase cost of goods.", "to identify products.", "to reduce sales.", "to confuse consumers.", "B"],
      ["Direct services are those services that", "are rendered to producers only.", "satisfy human wants directly.", "facilitate the production of goods.", "are essential to distribution.", "B"],
      ["Large scale production is limited by", "the extent of the market.", "availability of labor.", "government policies.", "transportation costs.", "A"],
      ["Which of the following is not a factor of production?", "Capital", "Money", "Labour", "Land", "B"],
      ["Division of labor means", "workers specialize in different tasks.", "work is divided among managers.", "labor is separated from capital.", "employees work part-time.", "A"],
      ["The reward for capital is", "rent.", "interest.", "wages.", "profit.", "B"],
      ["One disadvantage of division of labor is", "increased efficiency.", "monotony and boredom.", "higher productivity.", "better quality products.", "B"],
      ["The reward for entrepreneurship is", "rent.", "wages.", "interest.", "profit.", "D"],
      ["Which of the following is a feature of a limited liability company?", "Unlimited liability", "Perpetual succession", "Cannot sue or be sued", "Owned by one person", "B"],
      ["The document that contains the internal regulations of a company is", "Memorandum of Association.", "Articles of Association.", "Certificate of Incorporation.", "Prospectus.", "B"],
      ["A debenture holder is", "an owner of the company.", "a creditor of the company.", "a manager of the company.", "an employee of the company.", "B"],
      ["Public corporations are established by", "private individuals.", "Act of Parliament.", "cooperative societies.", "limited companies.", "B"],
      ["The main objective of public corporations is to", "maximize profit.", "provide essential services.", "compete with private firms.", "employ more people.", "B"],
      ["Nationalization means", "government taking over ownership of firms.", "privatization of state enterprises.", "merging of companies.", "liquidation of businesses.", "A"],
      ["The principle of caveat emptor means", "let the seller beware.", "let the buyer beware.", "let the government regulate.", "let the market decide.", "B"],
      ["A retailer who operates from a fixed location selling mainly groceries is a", "hawker.", "peddler.", "itinerant trader.", "shop keeper.", "D"],
      ["Goods sold on credit are recorded in the", "cash book.", "sales day book.", "purchases day book.", "general journal.", "B"],
      ["The Central Bank controls commercial banks through", "open market operations.", "closing branches.", "firing managers.", "reducing staff.", "A"]
    ];
    await seedInlineQuestions('Commerce', 60, commerceQs);

    // JSON-based seeds
    await seedFromJSON('seed-computer.json', 'Computer', 60, 50);
    await seedFromJSON('seed-economics.json', 'Economics', 60, 50);
    await seedFromJSON('seed-financial-accounting.json', 'Financial Accounting', 90, 60, true);
    await seedFromJSON('seed-government.json', 'Government', 60, 50);
    await seedFromJSON('seed-islamic-studies.json', 'Islamic Studies', 60, 50);
    await seedFromJSON('seed-mathematics.json', 'Mathematics', 90, 50);
    await seedFromJSON('seed-physics.json', 'Physics', 90, 50);

    console.log('\n✅ All 8 subjects seeded successfully!');
    console.log('📊 Total: 410 questions across Commerce, Computer, Economics, Financial Accounting, Government, Islamic Studies, Mathematics, Physics');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
