"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, Search, AlertTriangle } from 'lucide-react';
import type { AnalyzedResume, JobMatchResult } from '@/types';
import { jobMatcher, type JobMatcherInput } from '@/ai/flows/job-matcher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const jobSearchSchema = z.object({
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
});

type JobSearchFormValues = z.infer<typeof jobSearchSchema>;

interface JobSearchFormProps {
  resumeAnalysis: AnalyzedResume | null; // From resume scanner or fetched
  onMatchComplete: (matchResult: JobMatchResult) => void;
}

export function JobSearchForm({ resumeAnalysis, onMatchComplete }: JobSearchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobSearchFormValues>({
    resolver: zodResolver(jobSearchSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<JobSearchFormValues> = async (data) => {
    if (!resumeAnalysis) {
      toast({
        title: "Resume Data Missing",
        description: "Please scan or select a resume before matching jobs.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const input: JobMatcherInput = {
        resumeSkills: resumeAnalysis.skills.join(', '),
        resumeExperience: resumeAnalysis.experience.map(exp => `${exp.jobTitle} at ${exp.company} (${exp.duration})`).join('; '),
        // Handle education being string[] or object[]
        resumeEducation: resumeAnalysis.education.map(edu => {
            if (typeof edu === 'string') return edu;
            return `${edu.degree} from ${edu.institution}`;
        }).join('; '),
        jobDescription: data.jobDescription,
      };

      const matchResult = await jobMatcher(input);
      
      if (matchResult) {
        onMatchComplete(matchResult);
        toast({
          title: "Job Match Successful",
          description: "AI has ranked the job based on your resume.",
          variant: "default",
        });
      } else {
        throw new Error("AI job matching returned no result.");
      }
      // form.reset(); // Optionally reset form
    } catch (error: any) {
      console.error("Job matching error:", error);
      toast({
        title: "Job Matching Failed",
        description: error.message || "An unexpected error occurred during job matching.",
        variant: "destructive",
        action: <AlertTriangle className="text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Find Your Match</CardTitle>
        <CardDescription>Paste a job description below. Our AI will rank its relevance to your selected resume.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the full job description here..."
              className="min-h-[200px] mt-1"
              {...form.register("jobDescription")}
              disabled={isSubmitting || !resumeAnalysis}
            />
            {form.formState.errors.jobDescription && (
              <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.jobDescription.message}</p>
            )}
            {!resumeAnalysis && (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                    Please scan a resume first or ensure one is selected.
                </p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting || !resumeAnalysis || !form.formState.isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Matching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Match Job
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
