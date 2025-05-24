
'use server';
/**
 * @fileOverview AI-powered interview coach.
 *
 * - coachInterview - A function that handles interview coaching.
 * - InterviewCoachInput - The input type for the coachInterview function.
 * - InterviewCoachOutput - The return type for the coachInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const InterviewCoachInputSchema = z.object({
  action: z.enum(['generateQuestions', 'getFeedbackOnAnswer']).describe("The action to perform: generate questions or get feedback on an answer."),
  jobDescription: z.string().optional().describe("The job description to tailor the coaching (optional)."),
  questionCategory: z.enum(["behavioral", "technical", "situational", "general"]).optional().describe("Category of questions to generate (e.g., behavioral, technical). Relevant if action is 'generateQuestions'."),
  interviewQuestion: z.string().optional().describe("The specific interview question the user answered or wants to practice. Relevant if action is 'getFeedbackOnAnswer'."),
  userAnswer: z.string().optional().describe("The user's answer to the interview question. Relevant if action is 'getFeedbackOnAnswer'."),
});
export type InterviewCoachInput = z.infer<typeof InterviewCoachInputSchema>;

export const InterviewCoachOutputSchema = z.object({
  generatedQuestions: z.array(z.string()).optional().describe("A list of suggested interview questions."),
  answerFeedback: z.string().optional().describe("Constructive feedback on the user's provided answer."),
  generalTips: z.array(z.string()).optional().describe("General interview preparation tips."),
});
export type InterviewCoachOutput = z.infer<typeof InterviewCoachOutputSchema>;

export async function coachInterview(input: InterviewCoachInput): Promise<InterviewCoachOutput> {
  return interviewCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewCoachPrompt',
  input: {schema: InterviewCoachInputSchema},
  output: {schema: InterviewCoachOutputSchema},
  prompt: `You are an expert AI Interview Coach. Your goal is to help users prepare for job interviews.

{{#if jobDescription}}
Considering the following job description:
---
{{{jobDescription}}}
---
{{/if}}

{{#if (eq action "generateQuestions")}}
Please generate 5 relevant interview questions.
{{#if questionCategory}}
Focus on {{questionCategory}} questions.
{{else}}
Provide a mix of general questions.
{{/if}}
Also, provide 2-3 general interview tips.
The output should be a JSON object with "generatedQuestions" (an array of strings) and "generalTips" (an array of strings).
{{/if}}

{{#if (eq action "getFeedbackOnAnswer")}}
The user was asked the following question: "{{interviewQuestion}}"
And provided this answer:
---
{{{userAnswer}}}
---
Please provide constructive feedback on their answer. Consider clarity, conciseness, relevance to the question, and the STAR method if applicable.
Also, provide 2-3 general interview tips relevant to answering questions effectively.
The output should be a JSON object with "answerFeedback" (a string) and "generalTips" (an array of strings).
{{/if}}
`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
    ],
  },
});

const interviewCoachFlow = ai.defineFlow(
  {
    name: 'interviewCoachFlow',
    inputSchema: InterviewCoachInputSchema,
    outputSchema: InterviewCoachOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate a response for the interview coach.");
    }
    // Ensure generalTips is always an array, even if empty, if not provided by LLM for some reason.
    if (!output.generalTips) {
      output.generalTips = [];
    }
    return output;
  }
);
