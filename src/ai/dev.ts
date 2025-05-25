
import { config } from 'dotenv';
config();

import '@/ai/flows/job-matcher.ts';
import '@/ai/flows/resume-analyzer.ts';
import '@/ai/flows/job-recommender.ts';
// import '@/ai/flows/interview-coach.ts'; // Removed Interview Coach flow
import '@/ai/flows/interview-prep-flow.ts'; // Added Interview Prep flow
