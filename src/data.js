// ✏️  Edit this file to change what the site says. Everything shown comes from here.

export const profile = {
  name: 'Sahrish Jaweria',
  initials: 'SJ',
  role: 'Software Quality Assurance Engineer | QA Analyst',
  location: 'Lahore, Pakistan',
  email: 'sahrishjaweria9@gmail.com',
  resumeUrl: '', // put resume.pdf in /public and set this to '/resume.pdf'
  available: true,
  positioning:
    "I don't just test software. I investigate, challenge, and improve the quality of digital products.",
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sahrish-jaweria' },
    // { label: 'GitHub', url: 'https://github.com/YOUR-USERNAME' },
  ],
}

export const hero = {
  headline: 'Breaking software before users do.',
  subheading: 'Software Quality Assurance Engineer | Finding What Others Miss.',
  text: 'I turn complex workflows into reliable experiences through strategic testing, deep investigation, and attention to every detail.',
  status: 'Available for QA Opportunities',
}

export const about = {
  headline: "Quality is not an accident. It's a process.",
  paragraphs: [
    'I am a Software Quality Assurance professional passionate about identifying software issues, investigating unexpected behaviors, and making sure every release is one users can trust.',
    'In 3 years of QA I have tested products across very different domains, from construction management platforms and Caribbean airline solutions to ERP and pharmacy management systems. Each one taught me to learn a domain fast, think like the end user, and find the issues that matter before customers do.',
    'My foundation is thorough manual testing, backed by test automation and AI-assisted workflows using Claude AI and Codex to design test cases, generate scripts, and analyse defects faster.',
  ],
  principles: [
    { title: 'Investigate', text: 'Every unexpected behaviour has a cause. I dig until I find it and can reproduce it.' },
    { title: 'Challenge', text: 'Happy paths are the easy part. I test edge cases, bad data, and the flows nobody planned for.' },
    { title: 'Improve', text: 'A clear, reproducible bug report is a gift to the team. I write the ones developers thank you for.' },
  ],
}

export const focusAreas = [
  { name: 'Manual Testing', desc: 'Structured, hands-on testing of real user flows.' },
  { name: 'Functional Testing', desc: 'Verifying features do exactly what the requirements say.' },
  { name: 'Regression Testing', desc: 'Making sure new changes never break what already worked.' },
  { name: 'Exploratory Testing', desc: 'Unscripted, curiosity-driven testing that finds the hidden bugs.' },
  { name: 'UI / UX Testing', desc: 'Checking consistency, usability, and responsiveness across screens.' },
  { name: 'API Testing', desc: 'Validating requests, responses, status codes, and error handling.' },
  { name: 'Database Testing', desc: 'Confirming data integrity, queries, and back-end consistency.' },
  { name: 'Bug Reporting & Tracking', desc: 'Clear, reproducible reports tracked from discovery to closure.' },
  { name: 'Test Case Design', desc: 'Coverage-driven test cases mapped to requirements.' },
  { name: 'Test Scenario Creation', desc: 'End-to-end scenarios that mirror real business workflows.' },
  { name: 'Software Quality Evaluation', desc: 'Assessing release readiness with evidence, not guesswork.' },
  { name: 'ERP & Pharmacy Systems', desc: 'Domain testing for ERP and pharmacy management software.' },
]

export const tools = [
  'Test Automation',
  'API Testing',
  'Postman',
  'Jira',
  'Git',
  'SQL',
  'Claude AI',
  'OpenAI Codex',
]

export const process = [
  { step: '01', title: 'Understand', text: 'Study requirements, user stories, and the business domain before touching the product.' },
  { step: '02', title: 'Design', text: 'Write test scenarios and test cases that cover functional, negative, and edge-case paths.' },
  { step: '03', title: 'Execute', text: 'Run manual, exploratory, regression, API, and database tests across environments.' },
  { step: '04', title: 'Report', text: 'Log reproducible defects with steps, evidence, severity, and priority. Track them to closure.' },
  { step: '05', title: 'Verify', text: 'Retest fixes, run regression, and sign off only when quality is proven.' },
]

// Client work is usually private, so links are optional. Add `link: 'https://…'` to show one.
// Images are illustrative SVG screens in /public/projects (not real screenshots).
export const projects = [
  {
    title: 'Safety Certificate Management System',
    domain: 'Compliance',
    platform: 'Web',
    image: '/projects/safety-certificates.svg',
    description:
      'Creates, stores, tracks and manages safety certificates for employees, vehicles, machines and sites in one digital database. Shows expiry dates with reminders before a certificate lapses; admins approve, update or renew; reports show what is valid or expired. Replaces paperwork and makes audits and inspections faster.',
    tags: ['Functional', 'Regression', 'Database Testing'],
  },
  {
    title: 'Owner Builder House (OBH)',
    domain: 'Construction',
    platform: 'Web',
    image: '/projects/obh-construction.svg',
    description:
      'Construction project-management platform that takes a project from client registration to completion. Clients register and submit project details, go through admin review and meetings, and once the deal is finalised the project runs through construction and financial modules: project-wise budgets, estimated vs. actual expenses, progress and activity tracking, and centralised records.',
    tags: ['Workflow Testing', 'Regression', 'Calculations'],
  },
  {
    title: 'Centorvia',
    domain: 'Healthcare',
    platform: 'Web',
    image: '/projects/centorvia-pharmacy.svg',
    description:
      'Pharmacy management system covering inventory, prescriptions, billing and reporting. Tested with patient safety in mind: stock levels, dispensing flows and calculations had to be exactly right.',
    tags: ['Functional', 'Database Testing', 'UI / UX'],
  },
  {
    title: 'Caribbean Airline Solutions',
    domain: 'Aviation',
    platform: 'Web',
    image: '/projects/airline-solutions.svg',
    description:
      'Airline software serving Caribbean carriers, covering booking and operations flows where accuracy is critical. Functional, integration and regression testing across releases.',
    tags: ['Functional', 'Integration', 'Regression'],
  },
  {
    title: 'Trust Allay',
    domain: 'Investigation',
    platform: 'Web',
    image: '/projects/trust-allay.svg',
    description:
      'Online case management and investigation platform for the private sector: cases are reported, assigned, investigated with evidence, and resolved. Tested the workflow end to end, including who can see and change what.',
    tags: ['Workflow Testing', 'Access Control', 'API Testing'],
  },
  {
    title: 'Court Case Management System',
    domain: 'Legal',
    platform: 'Web',
    image: '/projects/case-management.svg',
    description:
      'Manages court cases from filing to closure: case records, parties, hearing schedules and documents. Focused on data accuracy and status transitions, where a wrong date or state has real consequences.',
    tags: ['Functional', 'Regression', 'Test Scenarios'],
  },
  {
    title: 'School Surveillance System',
    domain: 'Education',
    platform: 'Web',
    image: '/projects/school-surveillance.svg',
    description:
      'School management system with permission-based live classroom camera access for parents. Tested that each parent could see only the classrooms they were granted, alongside the school’s day-to-day management flows.',
    tags: ['Access Control', 'Functional', 'UI / UX'],
  },
  {
    title: 'InnBucks Loyalty System',
    domain: 'Loyalty & Rewards',
    platform: 'Web',
    image: '/projects/innbucks-loyalty.svg',
    description:
      'Loyalty platform where users register, earn points on online and in-store purchases, track earned and redeemed points, and redeem rewards such as discounts, coupons and gifts from a catalog. Admins manage users, points rules, rewards and reports; users get notified about points, redemptions and offers. Tested points calculation, redemption rules and balance accuracy.',
    tags: ['Calculations', 'Functional', 'API Testing'],
  },
  {
    title: 'QripIT',
    domain: 'Expenses',
    platform: 'Mobile',
    image: '/projects/qripit-receipts.svg',
    description:
      'Digital receipt and expense management app that replaces paper receipts. Users store purchase receipts securely on their phone, keep an organised purchase history and track expenses, with receipts available any time.',
    tags: ['Mobile Testing', 'Functional', 'UI / UX'],
  },
  {
    title: 'Splitora',
    domain: 'Finance',
    platform: 'Mobile',
    image: '/projects/splitora.svg',
    description:
      'Daily hisaab-kitaab app for groups who share expenses: hostel roommates, office colleagues, picnic and trip groups. Everyone adds what they spent and Splitora works out who owes whom. Tested the split calculations, edge cases like uneven shares, and the experience across screen sizes.',
    tags: ['Mobile Testing', 'Functional', 'Calculations'],
  },
  {
    title: 'Gym Finder & Membership App',
    domain: 'Fitness',
    platform: 'Mobile',
    image: '/projects/gym-app.svg',
    description:
      'Online gym registration and subscription app. People search for gyms near them, register, and pay monthly or yearly subscriptions, with extras such as gym food and club memberships. Tested search, registration, payment and subscription flows, including renewals and expiry.',
    tags: ['Mobile Testing', 'Payments', 'Functional'],
  },
  {
    title: 'Quran App',
    domain: 'Islamic',
    platform: 'Mobile',
    image: '/projects/quran-app.svg',
    description:
      'Islamic mobile app with the complete Quran Pak, translations, Hadith collections, duas and azkar in one place. Tested navigation between sections, reading and search accuracy, and consistency across devices, where correctness matters above everything.',
    tags: ['Mobile Testing', 'Content Accuracy', 'UI / UX'],
  },
]

export const experience = [
  {
    role: 'Software Quality Assurance Engineer',
    company: 'Sumato Solutions',
    period: 'Aug 2024 – Present',
    type: 'Full-time',
    points: [
      'Manual, functional, regression, exploratory, API and database testing of web and mobile products.',
      'Design test scenarios and test cases from requirements; report and track defects through to closure.',
      'Build automated tests for key regression flows and use Claude AI and Codex to speed up test design and automation.',
    ],
  },
  {
    role: 'Software Quality Assurance Engineer',
    company: 'SeeBiz',
    period: 'Jan 2024 – Aug 2024',
    type: 'Contract',
    points: [
      'Tested web applications end to end: test planning, test case execution, regression cycles and UAT support.',
      'Reported reproducible defects with clear steps and evidence, and verified fixes before release.',
    ],
  },
]
