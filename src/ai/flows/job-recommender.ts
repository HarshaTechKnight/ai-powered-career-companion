
'use server';
/**
 * @fileOverview AI-powered job recommender.
 *
 * - recommendJobs - A function that suggests job roles based on resume details.
 * - JobRecommenderInput - The input type for the recommendJobs function.
 * - JobRecommenderOutput - The return type for the recommendJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobRecommenderInputSchema = z.object({
  resumeSkills: z
    .string()
    .describe('Skills extracted from the resume, comma separated.'),
  resumeExperience: z
    .string()
    .describe('Experience extracted from the resume, including job titles, companies, and duration, comma separated.'),
  resumeEducation: z
    .string()
    .describe('Education details extracted from the resume, including degrees and institutions, comma separated.'),
});
export type JobRecommenderInput = z.infer<typeof JobRecommenderInputSchema>;

const RecommendedJobSchema = z.object({
  id: z.string().describe("A unique identifier for the recommended job, e.g., 'recJob1', 'recJob2'."),
  title: z.string().describe('The job title.'),
  company: z.string().describe('A plausible company name (can be generic like "Tech Startup" or "Global Corp" if a specific one is not known).'),
  reasoning: z.string().describe('A 1-2 sentence explanation of why this job is a good match or a brief description of typical responsibilities for such a role.'),
  relevanceScore: z.string().optional().describe('An estimated relevance score or category (e.g., "High Match", "90% Relevance").')
});

const JobRecommenderOutputSchema = z.object({
  recommendations: z.array(RecommendedJobSchema).describe('A list of 3-5 recommended jobs.'),
});
export type JobRecommenderOutput = z.infer<typeof JobRecommenderOutputSchema>;


export async function recommendJobs(input: JobRecommenderInput): Promise<JobRecommenderOutput> {
  return jobRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobRecommenderPrompt',
  input: {schema: JobRecommenderInputSchema},
  output: {schema: JobRecommenderOutputSchema},
  prompt: `You are an expert career advisor AI. Based on the following resume details, recommend 3-5 job roles that would be a good fit for the candidate.

Resume Skills: {{{resumeSkills}}}
Resume Experience: {{{resumeExperience}}}
Resume Education: {{{resumeEducation}}}

For each recommended job, provide:
1.  A unique ID (e.g., "recJob1", "recJob2").
2.  The job title.
3.  A plausible company name (e.g., "Innovatech Solutions", "NextGen Corp", "Global Dynamics Inc."). If unknown, use a generic but realistic type like "Growing SaaS Company" or "Established Financial Firm".
4.  A concise (1-2 sentences) reasoning explaining why this job is a good match for the candidate's profile or a brief description of typical responsibilities for such a role.
5.  An optional relevance score or category (e.g., "Strong Match", "Good Fit", "Potential Growth Area", "85% Relevance").

Structure your output according to the 'recommendations' array in the output schema.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const jobRecommenderFlow = ai.defineFlow(
  {
    name: 'jobRecommenderFlow',
    inputSchema: JobRecommenderInputSchema,
    outputSchema: JobRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
