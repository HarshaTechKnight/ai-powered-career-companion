
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
  education: (ResumeEducation | string)[];
  atsScore: number;
}

// Represents a user's profile
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  headline?: string;
  // Consider adding:
  // primaryResumeId?: string;
  // resumes?: StoredResume[];
}

// Represents a resume stored in the user's profile
export interface StoredResume extends AnalyzedResume {
  id: string;
  fileName: string;
  uploadDate: string; // or Date object
  isPrimary?: boolean;
}

// Represents a job application tracked by the user
export interface JobApplication {
  id:string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Saved';
  dateApplied: string; // or Date object
  resumeIdUsed?: string; // ID of the StoredResume used for this application
}
