"use client";

import { useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2, FileUp, CheckCircle, AlertTriangle } from 'lucide-react';
import type { AnalyzedResume } from '@/types';
import { analyzeResume, type AnalyzeResumeInput } from '@/ai/flows/resume-analyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const resumeUploadSchema = z.object({
  resumeFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, "Please select a resume file.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf and .docx files are accepted."
    ),
});

type ResumeUploadFormValues = z.infer<typeof resumeUploadSchema>;

interface ResumeUploadFormProps {
  onAnalysisComplete: (analysis: AnalyzedResume, fileName: string) => void;
}

export function ResumeUploadForm({ onAnalysisComplete }: ResumeUploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<ResumeUploadFormValues>({
    resolver: zodResolver(resumeUploadSchema),
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      form.setValue("resumeFile", files); // Update react-hook-form state
      form.trigger("resumeFile"); // Manually trigger validation for the file input
    } else {
      setFileName(null);
      form.setValue("resumeFile", new DataTransfer().files); // Clear the file input in form state
    }
  };

  const onSubmit: SubmitHandler<ResumeUploadFormValues> = async (data) => {
    setIsSubmitting(true);
    const file = data.resumeFile[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const input: AnalyzeResumeInput = { resumeDataUri: base64data };
        
        const analysisResult = await analyzeResume(input);

        if (analysisResult) {
          onAnalysisComplete(analysisResult as AnalyzedResume, file.name); // Cast needed due to AI flow output schema flexibility
          toast({
            title: "Resume Analyzed Successfully",
            description: `${file.name} has been processed.`,
            variant: "default",
            action: <CheckCircle className="text-green-500" />,
          });
        } else {
          throw new Error("AI analysis returned no result.");
        }
        form.reset(); // Reset form after successful submission
        setFileName(null); // Clear displayed file name
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast({
          title: "Error Reading File",
          description: "Could not read the selected file. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      };
    } catch (error: any) {
      console.error("Resume analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "An unexpected error occurred during resume analysis.",
        variant: "destructive",
        action: <AlertTriangle className="text-red-500" />,
      });
      setIsSubmitting(false);
    } finally {
      // setIsSubmitting(false) is handled in onloadend/onerror or if error occurs before that
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Scan Your Resume</CardTitle>
        <CardDescription>Upload your resume (PDF or DOCX, max 5MB) to extract key information using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="resumeFile" className={cn("flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors", form.formState.errors.resumeFile && "border-destructive")}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF or DOCX (MAX. 5MB)</p>
                {fileName && <p className="text-xs text-primary mt-2">{fileName}</p>}
              </div>
              <Input 
                id="resumeFile" 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </Label>
            {form.formState.errors.resumeFile && (
              <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.resumeFile.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting || !form.formState.isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Scan Resume"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
