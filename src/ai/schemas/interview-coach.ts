
import { z } from 'genkit';

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
