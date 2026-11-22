/* ─── Portfolio Data Types ───────────────────── */

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Stat {
  suffix: string;
  label: string;
  number: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tech: string[];
  accentColor?: string;
  liveUrl?: string;
  githubUrl?: string;
  type?: string;
  domain?: string;
  link?: string;
  isConfidential?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  highlights?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  achievements?: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
  isExternal?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
