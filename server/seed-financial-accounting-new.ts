import { db } from './db';
import { questions, subjects } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function seedFinancialAccounting() {
  console.log('Starting to seed Financial Accounting questions...');

  // Get Financial Accounting subject
  const [financialSubject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, 'Financial Accounting'));

  if (!financialSubject) {
    console.error('Financial Accounting subject not found!');
    return;
  }

  console.log(`Found Financial Accounting subject: ${financialSubject.id}`);

  // Delete existing Financial Accounting questions
  await db.delete(questions).where(eq(questions.subjectId, financialSubject.id));
  console.log('Deleted existing Financial Accounting questions');

  // Passage for questions 7-9
  const passage7to9 = `Use the following information to answer questions 7 - 9.

Okon and Yusuf are partners sharing profits and losses equally. Extracts from their books showed:
                                        Okon              Yusuf
Capital account 1/1/18:         N800,000         N1,000,000
Current account 1/1/18:        N400,000 (cr)    N300,000 (dr)
Drawings during the year:     N80,000           N100,000
Salaries:                             N100,000          N100,000

Interest on capital is 10%. The net profit for the year is N800,000.`;

  // Passage for questions 12-14
  const passage12to14 = `Use the following information to answer questions 12 - 14.

The Government of Nigeria approved N30,000,000 to five local government areas. The allocation was distributed as follows:

Equity basis: 75%
Population basis: 25%

Local Governments: V, W, X, Y, Z
Population: V: 10,000,000; W: 7,000,000; X: 4,000,000; Y: 2,000,000; Z: 500,000; Total: 23,500,000`;

  // Passage for questions 16-17
  const passage16to17 = `Use the following information to answer questions 16 and 17.

BH (consignor) of Jalings sent 50 cartons of biscuits at cost price of N1,200 per carton to Nda (consignee) in Minna. They agreed at 5% commission on sales. Nda sold 30 cartons at N2,500 each and 20 cartons at N2,000 each.`;

  // Passage for questions 21-23
  const passage21to23 = `Use the following information to answer questions 21 - 23.

Raw materials purchased: N20,000
Stock 1/1/2015:
  Finished goods: N5,000
  Raw materials: N3,000
Work in progress at start: N2,000
Wages:
  Direct: N15,000
  Indirect: N7,000
Indirect expenses:
  Electricity: N5,000
  Insurance: N2,200
Stock (raw materials) 31/1/2015: N1,000
Work in progress at end: N4,000`;

  // Passage for questions 26-28
  const passage26to28 = `Use the following information to answer questions 26 - 28.

Purchase price of machinery: N120,000
Freight and installation cost: N20,000
Annual maintenance cost: N4,000
Estimated scrap value: N10,000
Number of years used: 5`;

  // Passage for questions 32-34
  const passage32to34 = `Use the following information to answer questions 32 - 34.

An extract from the books of ALUKO a sole trader for the year ended 30th September, 2015.
Net purchases: N96,000
Stock 1/10/2014: N80,000
Salaries: N20,000
General expenses: N20,000
Net sales: N240,000
Stock 30/9/2015: N40,000`;

  // Passage for question 41
  const passage41 = `Use the following information to answer question 41.

The following were extracted from the statement of affairs of Mr. Tolu for 31st December, 2015 and 2016.

31/12/2015 Opening capital: N50,550
31/12/2016 Closing capital: N70,200
Drawings during the year:
  Cash: N5,000
  Stock: N1,700`;

  // Passage for questions 45-46
  const passage45to46 = `Use the following information to answer questions 45 and 46.

An extract from the books of AYA Social Club as at 1st January, 2010.
Insurance prepaid: N2,000
Rent owing: N3,000
Furniture and Fittings: N2,500
Premises: N15,000
Creditors: N7,000
Cash: N3,700

Premises, furniture and fittings are to be depreciated by 10%.`;

  // Passage for question 53
  const passage53 = `A businessman started trading on 1st June, 1999. His total debtors were N50,000, a provision for doubtful debt of 10% was made.`;

  // Passage for question 55
  const passage55 = `Use the following information to answer question 55.

A company offered for sales 500,000 ordinary shares at N1.50, payable as follows:
Application: N0.30
Allotment: N0.60
On 1st call: N0.25
On 2nd call: N0.20
On 3rd call: N0.15`;

  // Passage for questions 56-57
  const passage56to57 = `Use the following information to answer questions 56 and 57.

An extract from the books of Jawa, a departmental store as at 30th April, 2011.

Dept A:
  Sales: N105,000
  Purchases: N70,500
  Opening stock: N10,000
  Closing stock: N5,600

Dept B:
  Sales: N65,000
  Purchases: N42,000
  Opening stock: N11,000
  Closing stock: N8,500

Space occupied: 60% (A), 40% (B)
Selling expenses: N120,500 is to be apportioned on the basis of sales.
Electricity bill: N45,000 is to be apportioned based on the floor area`;

  // All 60 questions with their options and correct answers
  const allQuestions = [
    {
      number: 1,
      text: 'The accounting principle that requires business to anticipate profits before losses is',
      options: ['accrual', 'matching', 'materiality', 'prudence', 'realisation'],
      answer: 'D'
    },
    {
      number: 2,
      text: 'An Article of Association contains',
      options: ['address of the company.', 'amount of authorised capital.', 'duties and powers of directors.', 'name of the company.', 'objects of the company.'],
      answer: 'C'
    },
    {
      number: 3,
      text: 'Control account is used for the following reasons except',
      options: ['for fraud prevention.', 'for profit maximisation.', 'to aid management control.', 'to ease detection of missing figures.', 'to locate errors.'],
      answer: 'B'
    },
    {
      number: 4,
      text: 'Who is the founder of principle of double entry?',
      options: ['Edwin James', 'Frank Wood', 'Luca Pacioli', 'Robert Iglean', 'Williams Akintola'],
      answer: 'C'
    },
    {
      number: 5,
      text: 'When was Association of National Accountants of Nigeria (ANAN) established?',
      options: ['1993', '1982', '1979', '1975', '1965'],
      answer: 'C'
    },
    {
      number: 6,
      text: 'Income and expenditure account is prepared to ascertain _____ of the non-profit making organisation.',
      options: ['creditors or debtors', 'inflow or outflow', 'profit or loss', 'purchases or sales', 'surplus or deficit'],
      answer: 'E'
    },
    {
      number: 7,
      text: "The interest on Okon's capital is",
      options: ['N180,000', 'N109,000', 'N95,000', 'N91,250', 'N80,000'],
      answer: 'E',
      instruction: passage7to9
    },
    {
      number: 8,
      text: "The interest on Yusuf's capital is",
      options: ['N155,000', 'N145,000', 'N102,000', 'N100,000', 'N80,000'],
      answer: 'D',
      instruction: passage7to9
    },
    {
      number: 9,
      text: 'The profit shared to each partner is',
      options: ['N210,000', 'N160,000', 'N120,000', 'N105,000', 'N100,000'],
      answer: 'A',
      instruction: passage7to9
    },
    {
      number: 10,
      text: 'The main purpose of manufacturing account is to determine',
      options: ['assets and liabilities', 'cost of goods produced', 'cost of plant and machinery', 'gross profit or loss', 'net profit and net loss'],
      answer: 'B'
    },
    {
      number: 11,
      text: 'The following are causes of difference between the bank statement and cashbook balance except',
      options: ['bank charges.', 'credit transfer.', 'presented cheque.', 'uncredited cheque.', 'unpresented cheque.'],
      answer: 'C'
    },
    {
      number: 12,
      text: 'What is the amount to be shared on equity basis?',
      options: ['N32,500,000', 'N22,500,000', 'N21,500,000', 'N20,500,000', 'N19,500,000'],
      answer: 'B',
      instruction: passage12to14
    },
    {
      number: 13,
      text: 'The amount received by Z local government based on population basis is',
      options: ['N500,000', 'N35,000,000', 'N167,489,000', 'N159,574,000', 'N100,000'],
      answer: 'D',
      instruction: passage12to14
    },
    {
      number: 14,
      text: 'The amount received by V local government based on equity and population is',
      options: ['N12,765,957,000', 'N8,000,000,000', 'N7,691,489,000', 'N7,555,000,000', 'N6,000,000'],
      answer: 'C',
      instruction: passage12to14
    },
    {
      number: 15,
      text: "Which of the following items is debited to the partners' current account?",
      options: ['Interest on capital', 'Interest on drawings', 'Interest on partner\'s loan', 'Salary of partners', 'Share of profit'],
      answer: 'B'
    },
    {
      number: 16,
      text: 'What is the amount of commission due to Nda (consignee)?',
      options: ['N5,750', 'N4,500', 'N3,700', 'N2,500', 'N1,750'],
      answer: 'A',
      instruction: passage16to17
    },
    {
      number: 17,
      text: 'What is the total amount of sales made by Nda (consignee)?',
      options: ['N125,000', 'N120,000', 'N115,000', 'N110,000', 'N100,000'],
      answer: 'C',
      instruction: passage16to17
    },
    {
      number: 18,
      text: 'The difference between two and three columns cashbook is _____ column.',
      options: ['bank', 'cash', 'discount', 'folio', 'particulars'],
      answer: 'C'
    },
    {
      number: 19,
      text: 'The loans obtained by a company from Investors through the capital market is',
      options: ['debenture', 'dividend', 'overdraft', 'premium', 'shares'],
      answer: 'A'
    },
    {
      number: 20,
      text: 'Which of the following is an appropriation account item in a partnership business?',
      options: ['Accrued insurance', 'Carriage outwards', 'Cost of sales', 'Interest on capital', 'Return outwards'],
      answer: 'D'
    },
    {
      number: 21,
      text: 'The amount of factory overhead is',
      options: ['N32,500', 'N28,200', 'N21,200', 'N15,200', 'N14,500'],
      answer: 'E',
      instruction: passage21to23
    },
    {
      number: 22,
      text: 'The prime cost is',
      options: ['N49,000', 'N45,500', 'N41,800', 'N38,800', 'N22,800'],
      answer: 'D',
      instruction: passage21to23
    },
    {
      number: 23,
      text: 'The cost of manufactured goods is',
      options: ['N63,000', 'N60,000', 'N50,000', 'N35,000,000', 'N22,000'],
      answer: 'A',
      instruction: passage21to23
    },
    {
      number: 24,
      text: 'The maximum members of private company as defined by its article is',
      options: ['50.', '40.', '30.', '20.', '10.'],
      answer: 'A'
    },
    {
      number: 25,
      text: 'A fund set aside out of profit and other surpluses to strengthen the financial position of a business is',
      options: ['capital.', 'debentures.', 'premium.', 'provision.', 'reserves.'],
      answer: 'E'
    },
    {
      number: 26,
      text: 'What is the total acquisition cost of machinery?',
      options: ['N140,000', 'N144,000', 'N150,000', 'N124,000', 'N120,000'],
      answer: 'A',
      instruction: passage26to28
    },
    {
      number: 27,
      text: 'What is the annual depreciation if straight-line method is used?',
      options: ['N28,000', 'N26,000', 'N24,000', 'N22,000', 'N20,000'],
      answer: 'B',
      instruction: passage26to28
    },
    {
      number: 28,
      text: 'Using reducing balance method at the rate of 20%, what is the depreciation for the second year?',
      options: ['N28,000', 'N22,400', 'N21,760', 'N19,200', 'N18,400'],
      answer: 'B',
      instruction: passage26to28
    },
    {
      number: 29,
      text: 'The following are features of Private Limited Liability Company except it:',
      options: ['limits the number of its members to fifty.', 'must end with "Limited".', 'must end with PLC.', 'prohibits any invitation to the public to subscribe to its shares.', 'restricts the right to transfer its shares.'],
      answer: 'C'
    },
    {
      number: 30,
      text: 'A fund budgeted for the payment of minor expenses is',
      options: ['cash float.', 'credit discount.', 'dividend.', 'provision.', 'reserve.'],
      answer: 'A'
    },
    {
      number: 31,
      text: 'The difference in trial balance is posted to _____ account.',
      options: ['capital', 'control', 'suspense', 'expense', 'trading'],
      answer: 'C'
    },
    {
      number: 32,
      text: 'The cost of goods sold is',
      options: ['N176,000', 'N156,000', 'N146,000', 'N136,000', 'N126,000'],
      answer: 'D',
      instruction: passage32to34
    },
    {
      number: 33,
      text: 'The gross profit percentage is',
      options: ['75%', '50.5%', '43.3%', '32.5%', '25%'],
      answer: 'C',
      instruction: passage32to34
    },
    {
      number: 34,
      text: 'The net profit is',
      options: ['N124,000', 'N104,000', 'N84,000', 'N64,000', 'N44,000'],
      answer: 'D',
      instruction: passage32to34
    },
    {
      number: 35,
      text: 'The total capital of partners is shown in the',
      options: ['statement of affairs.', 'statement of comprehensive income.', 'balance sheet.', 'cash flow statement.', 'appropriation account.'],
      answer: 'C'
    },
    {
      number: 36,
      text: 'The method of providing depreciation whereby the business sets aside an annual amount in an investment account to replace the asset at the end of its useful life is',
      options: ['reducing balance method.', 'straight line method.', 'revaluation method.', 'sinking fund method.', 'annuity method.'],
      answer: 'D'
    },
    {
      number: 37,
      text: 'Goodwill appearing on a partnership balance sheet indicates that',
      options: ['the partners have brought goodwill into the business.', 'goodwill has been purchased.', 'the business has incurred a loss.', 'the business has no goodwill.', 'assets exceed liabilities.'],
      answer: 'B'
    },
    {
      number: 38,
      text: 'The accounting equation is',
      options: ['Assets = Capital - Liabilities', 'Capital = Assets + Liabilities', 'Assets = Capital + Liabilities', 'Liabilities = Assets + Capital', 'Capital + Assets = Liabilities'],
      answer: 'C'
    },
    {
      number: 39,
      text: 'The book of account in which subsidiary books are aggregated is',
      options: ['ledger.', 'journal proper.', 'petty cashbook.', 'trial balance.', 'subsidiary ledger.'],
      answer: 'A'
    },
    {
      number: 40,
      text: 'Which of the following is not a purpose of maintaining a petty cashbook?',
      options: ['To relieve the chief cashier of the burden of handling small payments', 'To serve as a subsidiary book', 'To make small payments', 'To maintain proper control over cash', 'To make large payments'],
      answer: 'E'
    },
    {
      number: 41,
      text: 'What is the net profit or loss for the year?',
      options: ['N26,350 profit', 'N26,350 loss', 'N19,650 profit', 'N19,650 loss', 'N13,050 profit'],
      answer: 'A',
      instruction: passage41
    },
    {
      number: 42,
      text: 'Sales ledger control account is used to check the accuracy of',
      options: ['purchases ledger.', 'nominal ledger.', 'general ledger.', 'debtors ledger.', 'creditors ledger.'],
      answer: 'D'
    },
    {
      number: 43,
      text: 'The document used for recording cash paid out on behalf of a business is',
      options: ['payment voucher.', 'receipt.', 'invoice.', 'debit note.', 'credit note.'],
      answer: 'A'
    },
    {
      number: 44,
      text: 'Trading account is used to determine',
      options: ['net profit or loss.', 'gross profit or loss.', 'cost of sales.', 'total revenue.', 'total expenses.'],
      answer: 'B'
    },
    {
      number: 45,
      text: 'The amount for accumulated fund is',
      options: ['N22,200', 'N15,450', 'N12,200', 'N11,200', 'N10,200'],
      answer: 'D',
      instruction: passage45to46
    },
    {
      number: 46,
      text: 'The total assets of the club is',
      options: ['N23,200', 'N20,700', 'N18,450', 'N18,200', 'N17,200'],
      answer: 'B',
      instruction: passage45to46
    },
    {
      number: 47,
      text: 'In partnership accounts, interest on capital is',
      options: ['debited to profit and loss account.', 'credited to partners\' current accounts.', 'debited to partners\' capital accounts.', 'credited to partners\' capital accounts.', 'debited to partners\' current accounts.'],
      answer: 'B'
    },
    {
      number: 48,
      text: 'The concept which states that revenue and costs are recognized as they are earned or incurred, not as money is received or paid is',
      options: ['going concern.', 'business entity.', 'accrual.', 'consistency.', 'materiality.'],
      answer: 'C'
    },
    {
      number: 49,
      text: 'The term "creditors" in a balance sheet refers to',
      options: ['the owners of the business.', 'people who owe the business money.', 'people to whom the business owes money.', 'bank overdraft.', 'loan from directors.'],
      answer: 'C'
    },
    {
      number: 50,
      text: 'In the absence of a partnership agreement, profits and losses are shared',
      options: ['in the ratio of capital contributed.', 'equally among partners.', 'in the ratio of salaries.', 'in proportion to interest on capital.', 'according to the decision of senior partner.'],
      answer: 'B'
    },
    {
      number: 51,
      text: 'The account that shows the accumulated surplus of an non-profit making organization is',
      options: ['trading account.', 'profit and loss account.', 'accumulated fund.', 'capital reserve.', 'revenue reserve.'],
      answer: 'C'
    },
    {
      number: 52,
      text: 'Which of the following accounts will not appear in the nominal ledger?',
      options: ['Sales account', 'Rent account', 'Debtors account', 'Wages account', 'Electricity account'],
      answer: 'C'
    },
    {
      number: 53,
      text: 'What is the amount of provision for doubtful debt to be created?',
      options: ['N50,000', 'N45,000', 'N10,000', 'N5,000', 'N2,500'],
      answer: 'D',
      instruction: passage53
    },
    {
      number: 54,
      text: 'Subscriptions received by a club are',
      options: ['assets.', 'liabilities.', 'revenue.', 'capital.', 'expenses.'],
      answer: 'C'
    },
    {
      number: 55,
      text: 'What is the balance on share premium account?',
      options: ['N750,000', 'N500,000', 'N250,000', 'N150,000', 'N100,000'],
      answer: 'D',
      instruction: passage55
    },
    {
      number: 56,
      text: 'The gross profit for Department A is',
      options: ['N49,900', 'N44,900', 'N39,900', 'N34,500', 'N29,900'],
      answer: 'B',
      instruction: passage56to57
    },
    {
      number: 57,
      text: 'The gross profit for Department B is',
      options: ['N30,500', 'N25,500', 'N20,500', 'N15,500', 'N10,500'],
      answer: 'C',
      instruction: passage56to57
    },
    {
      number: 58,
      text: 'The purpose of reconciliation of debtors ledger control account with debtors ledger is to',
      options: ['find total debtors.', 'find total creditors.', 'locate errors.', 'prepare final accounts.', 'calculate bad debts.'],
      answer: 'C'
    },
    {
      number: 59,
      text: 'Capital expenditure is',
      options: ['payment for running expenses.', 'expenditure on fixed assets.', 'expenses paid in advance.', 'payment of salaries.', 'purchase of goods for resale.'],
      answer: 'B'
    },
    {
      number: 60,
      text: 'The process of transferring entries from the journal to the ledger is called',
      options: ['journalizing.', 'balancing.', 'posting.', 'recording.', 'casting.'],
      answer: 'C'
    }
  ];

  // Insert all questions
  for (const q of allQuestions) {
    console.log(`Inserting question ${q.number}...`);
    
    await db.insert(questions).values({
      subjectId: financialSubject.id,
      questionNumber: q.number,
      questionText: q.text,
      instruction: q.instruction || null,
      optionA: q.options[0],
      optionB: q.options[1],
      optionC: q.options[2],
      optionD: q.options[3],
      optionE: q.options[4],
      correctOption: q.answer
    });
  }

  console.log('✅ Successfully seeded all 60 Financial Accounting questions!');
  console.log('✅ Passage instructions added for questions 7-9, 12-14, 16-17, 21-23, 26-28, 32-34, 41, 45-46, 53, 55, 56-57');
  process.exit(0);
}

seedFinancialAccounting().catch(error => {
  console.error('Error seeding Financial Accounting questions:', error);
  process.exit(1);
});
