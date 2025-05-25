
'use server';
/**
 * @fileOverview AI-powered interview question and answer generator.
 *
 * - generateInterviewPrep - A function that generates interview questions and sample answers based on skills.
 * - InterviewPrepInput - The input type for the generateInterviewPrep function.
 * - InterviewPrepOutput - The return type for the generateInterviewPrep function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InterviewPrepInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  jobContext: z.string().optional().describe('Optional: A job title or brief description for more targeted questions (e.g., "Senior Software Engineer", "Marketing Manager role focusing on SEO").'),
});
export type InterviewPrepInput = z.infer<typeof InterviewPrepInputSchema>;

const InterviewPrepItemSchema = z.object({
  question: z.string().describe('The generated interview question.'),
  sampleAnswer: z.string().describe('A well-crafted sample answer to the question, demonstrating good practices.'),
  category: z.string().optional().describe('A category for the question (e.g., Behavioral, Technical - Python, Problem-solving).'),
});

const InterviewPrepOutputSchema = z.object({
  preparations: z.array(InterviewPrepItemSchema).describe('A list of 5-7 interview questions with sample answers and categories.'),
});
export type InterviewPrepOutput = z.infer<typeof InterviewPrepOutputSchema>;


export async function generateInterviewPrep(input: InterviewPrepInput): Promise<InterviewPrepOutput> {
  return interviewPrepFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewPrepPrompt',
  input: { schema: InterviewPrepInputSchema },
  output: { schema: InterviewPrepOutputSchema },
  prompt: `You are an expert AI Interview Coach.
Given the following skills:
{{#each skills}}
- {{{this}}}
{{/each}}

{{#if jobContext}}
And considering the job context: {{{jobContext}}}
{{else}}
And considering a general professional role related to these skills.
{{/if}}

Generate 5-7 common and insightful interview questions that are relevant to these skills and the provided job context (if any).
For each question, provide:
1.  The question itself.
2.  A concise, strong sample answer. The answer should be well-structured, positive, and highlight relevant aspects based on the skills. Aim for answers that are 3-5 sentences long.
3.  Optionally, a category for the question (e.g., Behavioral, Technical - [Specific Skill], Problem-solving, Situational).

Focus on creating realistic and helpful preparation material. Ensure the sample answers are practical and actionable.
Structure your response according to the 'preparations' array in the output schema.
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

const interviewPrepFlow = ai.defineFlow(
  {
    name: 'interviewPrepFlow',
    inputSchema: InterviewPrepInputSchema,
    outputSchema: InterviewPrepOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output?.preparations) {
        // Fallback or error handling if the AI doesn't return the expected structure
        return { preparations: [] };
    }
    return output;
  }
);
