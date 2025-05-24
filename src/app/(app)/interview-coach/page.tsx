
"use client";

import { useState, useEffect } from 'react'; // Added useEffect
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, Brain, MessageSquareHeart, AlertTriangle, Sparkles, ListChecks } from 'lucide-react';
import { coachInterview } from '@/ai/flows/interview-coach';
import { InterviewCoachInputSchema, type InterviewCoachInput, type InterviewCoachOutput } from '@/ai/schemas/interview-coach';
// Metadata should be handled by parent layout or server component for client components
// import type { Metadata } from 'next'; 

type CoachMode = "generateQuestions" | "getFeedbackOnAnswer";

export default function InterviewCoachPage() {
  const [mode, setMode] = useState<CoachMode>("generateQuestions");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InterviewCoachOutput | null>(null);

  const form = useForm<InterviewCoachInput>({
    resolver: zodResolver(InterviewCoachInputSchema),
    defaultValues: {
      action: "generateQuestions",
      jobDescription: "",
      questionCategory: "general",
      interviewQuestion: "",
      userAnswer: "",
    },
  });

  useEffect(() => {
    // Set document title on client side for client components
    document.title = "AI Interview Coach | KarmaMatch";
  }, []);

  const handleModeChange = (newMode: CoachMode) => {
    setMode(newMode);
    form.setValue("action", newMode);
    setResult(null); 
    form.reset({ 
        action: newMode,
        jobDescription: form.getValues("jobDescription"), 
        questionCategory: newMode === "generateQuestions" ? "general" : undefined,
        interviewQuestion: newMode === "getFeedbackOnAnswer" ? "" : undefined,
        userAnswer: newMode === "getFeedbackOnAnswer" ? "" : undefined,
    });
  };

  const onSubmit: SubmitHandler<InterviewCoachInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await coachInterview(data);
      setResult(response);
      toast({
        title: "AI Coach Responded!",
        description: mode === "generateQuestions" ? "Practice questions generated." : "Feedback provided on your answer.",
      });
    } catch (error: any) {
      console.error("Interview coach error:", error);
      toast({
        title: "Coaching Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
        action: <AlertTriangle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquareHeart className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Interview Coach</h1>
          <p className="text-muted-foreground">
            Get ready to ace your next interview!
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Coaching Mode</CardTitle>
          <RadioGroup
            defaultValue="generateQuestions"
            onValueChange={(value: string) => handleModeChange(value as CoachMode)}
            className="flex flex-col sm:flex-row gap-4 pt-2"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="generateQuestions" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer">Generate Practice Questions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="getFeedbackOnAnswer" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer">Get Feedback on My Answer</Label>
            </div>
          </RadioGroup>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="jobDescription">Job Description (Optional)</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here to get tailored questions or feedback..."
                className="min-h-[100px] mt-1"
                {...form.register("jobDescription")}
                disabled={isLoading}
              />
            </div>

            {mode === "generateQuestions" && (
              <div>
                <Label htmlFor="questionCategory">Question Category</Label>
                <Select
                  defaultValue="general"
                  onValueChange={(value) => form.setValue("questionCategory", value as InterviewCoachInput["questionCategory"])}
                  disabled={isLoading}
                >
                  <SelectTrigger id="questionCategory" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="situational">Situational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {mode === "getFeedbackOnAnswer" && (
              <>
                <div>
                  <Label htmlFor="interviewQuestion">Interview Question</Label>
                  <Textarea
                    id="interviewQuestion"
                    placeholder="What question were you asked or are you practicing?"
                    className="min-h-[60px] mt-1"
                    {...form.register("interviewQuestion")}
                    disabled={isLoading}
                  />
                  {form.formState.errors.interviewQuestion && <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.interviewQuestion.message}</p>}
                </div>
                <div>
                  <Label htmlFor="userAnswer">Your Answer</Label>
                  <Textarea
                    id="userAnswer"
                    placeholder="Type your answer here..."
                    className="min-h-[150px] mt-1"
                    {...form.register("userAnswer")}
                    disabled={isLoading}
                  />
                   {form.formState.errors.userAnswer && <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.userAnswer.message}</p>}
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
              ) : mode === "generateQuestions" ? (
                <><Brain className="mr-2 h-4 w-4" /> Generate Questions</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Get Feedback</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-md mt-8">
          <CardHeader>
            <div className="flex items-center gap-2">
                {mode === "generateQuestions" ? <ListChecks className="h-6 w-6 text-primary" /> : <Lightbulb className="h-6 w-6 text-primary" /> }
                <CardTitle className="text-xl">
                {mode === "generateQuestions" ? "Generated Questions" : "Answer Feedback"}
                </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === "generateQuestions" && result.generatedQuestions && (
              <div>
                <h3 className="font-semibold mb-2">Practice these questions:</h3>
                <ul className="list-disc pl-5 space-y-2 bg-muted/50 p-4 rounded-md">
                  {result.generatedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            )}
            {mode === "getFeedbackOnAnswer" && result.answerFeedback && (
              <div>
                <h3 className="font-semibold mb-2">Feedback on your answer:</h3>
                <p className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md">{result.answerFeedback}</p>
              </div>
            )}
            {result.generalTips && result.generalTips.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-1"><Lightbulb className="h-4 w-4" /> General Tips:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {result.generalTips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
