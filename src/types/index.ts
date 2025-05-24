export interface ResumeExperience {
  jobTitle: string;
  company: string;
  duration: string;
}

export interface ResumeEducation {
  degree: string;
  institution: string;
}

// Matches the output structure of analyzeResume AI flow
export interface AnalyzedResume {
  skills: string[];
  experience: ResumeExperience[];
  education: (ResumeEducation | string)[]; // Updated to match AI flow where education can be string array
}

// Matches the output structure of jobMatcher AI flow
export interface JobMatchResult {
  jobRanking: string;
  fitCategory: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  // Potentially add fields like avatarUrl, headline, etc.
}

export interface JobApplication {
  id:string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Saved';
  dateApplied: string; // or Date object
  resumeIdUsed?: string; // ID of the resume used for this application
}

export interface StoredResume extends AnalyzedResume {
  id: string;
  fileName: string;
  uploadDate: string; // or Date object
  isPrimary?: boolean;
}
