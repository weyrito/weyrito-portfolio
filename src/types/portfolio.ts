export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  interests: Interest[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  about: string;
  cv: {
    url: string;
    filename: string;
    size: string;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface Skills {
  [key: string]: SkillCategory;
}

export interface SkillCategory {
  title: string;
  items: (string | SkillItem)[];
  excludeFromCV: boolean;
}

export interface SkillItem {
  text: string;
  url?: string;
}

export interface Project {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  features: string[];
  url?: string;
  excludeFromCV: boolean;
}

export interface Experience {
  title: string;
  period: string;
  location?: string;
  highlights: string[];
  excludeFromCV: boolean;
}

export interface Education {
  title: string;
  period: string;
  institution?: string | InstitutionWithUrl;
  specialization?: string;
  subjects?: string[];
  excludeFromCV: boolean;
}

export interface InstitutionWithUrl {
  text: string;
  url: string;
}

export interface Language {
  language: string;
  level: string;
  excludeFromCV: boolean;
}

export interface Interest {
  text: string;
  excludeFromCV: boolean;
}
