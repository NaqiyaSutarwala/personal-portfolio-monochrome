import type {
  Skill,
  Project,
  Experience,
  Education,
  SocialLink,
  Stat,
} from "@/types/portfolio";

/* ─── Personal ─────────────────────────────── */
export const PERSONAL_INFO = {
  name: "Naqiya Sutarwala",
  firstName: "Naqiya",
  lastName: "Sutarwala",
  role: "MERN Stack Developer",
  bio: "MERN Stack Developer with 2+ years building scalable full-stack applications. I turn complex problems into clean, performant code across the entire stack.",
  location: "Ahmedabad, India",
  email: "sutarwalanaqiya16@gmail.com",
  linkedin: "https://www.linkedin.com/in/naqiya-sutarwala-5747751b0",
} as const;

/* ─── Hero stats ────────────────────────────── */
export const STATS: Stat[] = [
  { number: "2", suffix: "+", label: "Years Experience" },
  { number: "5", suffix: "+", label: "Projects Shipped" },
  { number: "10", suffix: "+", label: "Technologies" },
  { number: "3", suffix: "×", label: "Gold Medals" },
];

/* ─── Skills ────────────────────────────────── */
export const SKILLS: Skill[] = [
  {
    id: "frontend",
    category: "Frontend & Mobile",
    items: [
      "React.js",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Redux Toolkit",
      "Redux Thunk",
      "Zustand",
    ],
  },
  {
    id: "backend",
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "WebSockets",
      "BullMQ",
      "Multer",
    ],
  },
  {
    id: "database",
    category: "Database",
    items: [
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "AWS Redshift",
      "TypeORM",
      "Sequelize",
      "Mongoose",
    ],
  },
  {
    id: "ui",
    category: "UI & Styling",
    items: [
      "Tailwind CSS",
      "Material UI",
      "MantineUI",
      "Bootstrap",
      "Radix UI",
      "Recharts",
      "React Query",
      "React Hook Form",
      "Zod",
      "Formik",
    ],
  },
  {
    id: "devops",
    category: "Cloud, DevOps & Tools",
    items: [
      "AWS",
      "S3",
      "VPC",
      "Terraform",
      "Docker",
      "CI/CD",
      "Kafka",
      "Turborepo",
      "Git",
      "GitHub",
      "Bitbucket",
      "Jira",
      "Trello",
    ],
  },
  {
    id: "integrations",
    category: "Integrations",
    items: [
      "Stripe",
      "Razorpay",
      "Twilio",
      "AWS SES",
      "BigCommerce",
      "Sanity",
      "Contentstack",
      "Webhooks",
    ],
  },
];

export const TICKER_ITEMS = [
  "React.js",
  "Next.js",
  "React Native",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Stripe",
  "Socket.io",
  "Tailwind",
  "Redux",
  "Express.js",
  "Kafka",
  "CI/CD",
  "Redis",
  "Terraform",
];

/* ─── Projects ──────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    id: "medituri",
    number: "01",
    domain: "Healthcare",
    name: "Medituri",
    description:
      "Platform for healthcare professionals to search drugs and diseases — covering toxicology, treatments, risk calculators, and neonatal/pediatric categorization.",
    tech: ["ReactJS", "Redux", "NestJS", "TypeORM", "MySQL"],
    type: "Full Stack",
    link: "https://portal.medituri.com/",
  },
  {
    id: "crewmates",
    number: "02",
    domain: "PropTech",
    name: "Crewmates",
    description:
      "Property rental platform with host, user, and admin interfaces. Real-time chat via Twilio and secure Stripe payments for short and long-term stays.",
    tech: ["ReactJS", "NodeJS", "Twilio", "Stripe", "Tailwind"],
    type: "Frontend",
    link: "https://devhost.crewmatesapp.com/",
  },
  {
    id: "acquaintdb",
    number: "03",
    domain: "EdTech",
    name: "AcquaintDB — LMS",
    description:
      "Role-based Learning Management System for admins, faculty, and students. Online exams, fee collection, and enrollment management in one place.",
    tech: ["ReactJS", "NodeJS", "MUI", "Sequelize"],
    type: "Full Stack",
  },
  {
    id: "dukkan",
    number: "04",
    domain: "E-Commerce",
    name: "Dukkan",
    description:
      "Headless eCommerce with Next.js + BigCommerce. SEO optimization, rewards/points system, streamlined returns, and Google Analytics integration.",
    tech: ["Next.js", "BigCommerce", "Headless CMS", "SEO"],
    type: "Full Stack",
    // link: "https://dukkan-sit.qatardutyfree.com/",
    isConfidential: true,
  },
  {
    id: "thymos",
    number: "05",
    domain: "HealthTech",
    name: "Thymos — HealthSync",
    description:
      "Healthcare management integrated with OystEHR. Unified appointments, patient charts, real-time chat, and lab orders via AHA and Z3 API integrations.",
    tech: ["NextJS", "TypeScript", "NestJS", "PostgreSQL", "Redux Toolkit"],
    type: "Full Stack",
    link: "http://login.thymos.health/",
  },
  {
    id: "practice-suite",
    number: "06",
    domain: "AccountingTech",
    name: "Accounting Practice Suite",
    description:
      "Multi-app platform for accounting firms. Led development of practice management and client onboarding across frontend and backend, and migrated an existing document-processing app into the suite.",
    tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "BullMQ", "Turborepo"],
    type: "Full Stack",
    isConfidential: true,
  },
  {
    id: "dodare",
    number: "07",
    domain: "Productivity",
    name: "DoDare",
    description:
      "Goal accountability app where users back goals with a small pledge and submit proof before the deadline. Building the mobile app, API, and admin panel, with UPI AutoPay via Razorpay.",
    tech: ["React Native", "Expo", "React.js", "NestJS", "PostgreSQL", "Razorpay"],
    type: "Full Stack · In Development",
  },
];

/* ─── Experience ────────────────────────────── */
export const EXPERIENCES: Experience[] = [
  {
    id: "tm-systems",
    company: "TM Systems",
    role: "Full Stack Developer",
    location: "Ahmedabad, India",
    startDate: "Jul 2026",
    endDate: null,
    isCurrent: true,
  },
  {
    id: "qrious",
    company: "Qrious Tech Team LLP",
    role: "MERN Stack Developer",
    location: "Ahmedabad, India",
    startDate: "Jan 2024",
    endDate: "Jun 2026",
    isCurrent: false,
    highlights: [
      "Built full-stack applications with React, Next.js, Node.js, and NestJS across healthcare, property rental, education, and e-commerce.",
      "Developed a healthcare platform integrated with OystEHR, covering appointments, patient charts, chat, and lab orders.",
      "Built headless commerce features on Next.js and BigCommerce, including rewards, returns, SEO, and analytics.",
      "Integrated Stripe payments and Twilio real-time messaging into a property rental platform.",
    ],
  },
];

/* ─── Education ─────────────────────────────── */
export const EDUCATION: Education[] = [
  {
    id: "gujarat-uni",
    degree: "MSc IT — Mobile Applications & UI Development",
    institution: "Gujarat University, Ahmedabad",
    year: "June 2024",
    achievements: [
      "Gold Medal — 1st Rank, Semester One",
      "Gold Medal — 1st Rank, Semester Two",
      "Gold Medal — 1st Rank, Semester Three",
    ],
  },
];

/* ─── Social / Contact links ────────────────── */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    icon: "✉",
    label: "sutarwalanaqiya16@gmail.com",
    href: "mailto:sutarwalanaqiya16@gmail.com",
    isExternal: false,
  },
  {
    id: "linkedin",
    icon: "💼",
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/naqiya-sutarwala-5747751b0",
    isExternal: true,
  }
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
] as const;
