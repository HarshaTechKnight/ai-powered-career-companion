// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered resume analyzer to extract skills, experience, and education.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file (PDF/DOCX) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  experience: z
    .array(
      z.object({
        jobTitle: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        duration: z.string().describe('The duration of the job.'),
      })
    )
    .describe('A list of work experiences.'),
  education:
    z
      .array(
        z.object({
          degree: z.string().describe('The degree name.'),
          institution: z.string().describe('The institution name.'),
        })
      )
      .describe('A list of educations from the resume') || z.array(z.string()),
});

export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyzer. Extract the following information from the resume.\n\nSkills: A list of skills mentioned in the resume.\nExperience: A list of work experiences, including job title, company, and duration.\nEducation: A list of degrees and institutions.\n\nResume:\n{{media url=resumeDataUri}}`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
