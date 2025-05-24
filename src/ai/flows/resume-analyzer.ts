
// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered resume analyzer to extract skills, experience, education, and an ATS score.
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
  atsScore: z.number().min(0).max(100).describe('An estimated ATS compatibility score as a percentage (0-100), reflecting how well the resume is structured for automated parsing.'),
});

export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyzer. Extract the following information from the resume.

Skills: A list of skills mentioned in the resume.
Experience: A list of work experiences, including job title, company, and duration.
Education: A list of degrees and institutions.
ATS Score: An estimated ATS compatibility score as a percentage (e.g., 85 for 85%). This score should reflect how well the resume is structured for automated parsing by Applicant Tracking Systems. Consider factors like clear section headings, standard formatting, keyword relevance (general good practices), and avoidance of complex layouts or images that might hinder parsing.

Resume:
{{media url=resumeDataUri}}`,
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

