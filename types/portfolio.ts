export interface Personal {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
}

export interface About {
  bio: string;
  skills: string[];
}

export interface WorkEntry {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean;
}

export interface EducationEntry {
  title: string;
  institution: string;
  year: string;
  link?: string;
}

export interface CertificationEntry {
  title: string;
  organization: string;
  year: string;
  link?: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  leetcode?: string;
  x?: string;
  resume?: string;
}

export interface PortfolioData {
  personal: Personal;
  about: About;
  experience?: ExperienceEntry[];
  work: WorkEntry[];
  projects: Project[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  socials: Socials;
}
