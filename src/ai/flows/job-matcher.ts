'use server';

/**
 * @fileOverview Job matching AI agent.
 *
 * - jobMatcher - A function that handles the job matching process.
 * - JobMatcherInput - The input type for the jobMatcher function.
 * - JobMatcherOutput - The return type for the jobMatcher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobMatcherInputSchema = z.object({
  resumeSkills: z
    .string()
    .describe('Skills extracted from the resume, comma separated.'),
  resumeExperience: z
    .string()
    .describe('Experience extracted from the resume, including job titles, companies, and duration, comma separated.'),
  resumeEducation: z
    .string()
    .describe('Education details extracted from the resume, including degrees and institutions, comma separated.'),
  jobDescription: z
    .string()
    .describe('The job description for which to find the best match.'),
});
export type JobMatcherInput = z.infer<typeof JobMatcherInputSchema>;

const JobMatcherOutputSchema = z.object({
  jobRanking: z.string().describe('Ranking of the job based on relevance to the resume.'),
  fitCategory: z.string().describe('Category of fit, either Best Fit or Stretch Role.'),
});
export type JobMatcherOutput = z.infer<typeof JobMatcherOutputSchema>;

export async function jobMatcher(input: JobMatcherInput): Promise<JobMatcherOutput> {
  return jobMatcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobMatcherPrompt',
  input: {schema: JobMatcherInputSchema},
  output: {schema: JobMatcherOutputSchema},
  prompt: `You are an AI job matching expert. Use the skills, experience, and education from the resume to rank the job posting based on relevance.

Resume Skills: {{{resumeSkills}}}
Resume Experience: {{{resumeExperience}}}
Resume Education: {{{resumeEducation}}}

Job Description: {{{jobDescription}}}

Consider the resume and job description and provide a ranking of the job and a fit category.
`,config: {
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

const jobMatcherFlow = ai.defineFlow(
  {
    name: 'jobMatcherFlow',
    inputSchema: JobMatcherInputSchema,
    outputSchema: JobMatcherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
