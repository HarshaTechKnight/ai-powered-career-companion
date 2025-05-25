
"use client"; 

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeUploadForm } from '@/components/resume-scanner/ResumeUploadForm';
import { ResumeAnalysisDisplay } from '@/components/resume-scanner/ResumeAnalysisDisplay';
import type { AnalyzedResume, InterviewPrepItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, FilePlus2, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateInterviewPrep, type InterviewPrepInput } from '@/ai/flows/interview-prep-flow';
import { InterviewPrepDisplay } from '@/components/interview/InterviewPrepDisplay';
import { toast } from '@/hooks/use-toast';

function ResumeScannerPageContent() {
  const searchParams = useSearchParams();
  const [analysisResult, setAnalysisResult] = useState<AnalyzedResume | null>(null);
  const [analyzedFileName, setAnalyzedFileName] = useState<string>("");
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const [interviewPrepData, setInterviewPrepData] = useState<InterviewPrepItem[] | null>(null);
  const [isFetchingInterviewPrep, setIsFetchingInterviewPrep] = useState(false);

  useEffect(() => {
    const resumeId = searchParams.get('resumeId');
    const fileName = searchParams.get('fileName'); 
    if (resumeId) {
      setIsLoadingAnalysis(true);
      setTimeout(() => {
        console.log("Attempting to load analysis for resume ID:", resumeId);
        if (fileName) {
            setAnalyzedFileName(decodeURIComponent(fileName));
        }
        setIsLoadingAnalysis(false);
      }, 500);
    }
  }, [searchParams]);

  const fetchInterviewPrep = async (skills: string[], jobContext?: string) => {
    if (!skills || skills.length === 0) {
      setInterviewPrepData([]); // No skills, no prep
      return;
    }
    setIsFetchingInterviewPrep(true);
    setInterviewPrepData(null); // Clear previous data
    try {
      const input: InterviewPrepInput = { skills, jobContext };
      const result = await generateInterviewPrep(input);
      if (result && result.preparations) {
        setInterviewPrepData(result.preparations);
        toast({
          title: "Interview Prep Ready!",
          description: "AI has generated some practice questions for you.",
        });
      } else {
        throw new Error("AI interview prep returned no result or invalid format.");
      }
    } catch (error: any) {
      console.error("Interview prep error:", error);
      toast({
        title: "Interview Prep Failed",
        description: error.message || "Could not generate interview questions.",
        variant: "destructive",
        action: <AlertTriangle className="text-red-500" />,
      });
      setInterviewPrepData([]); // Set to empty array on error to stop loading
    } finally {
      setIsFetchingInterviewPrep(false);
    }
  };

  const handleAnalysisComplete = (analysis: AnalyzedResume, fileName: string) => {
    setAnalysisResult(analysis);
    setAnalyzedFileName(fileName);
    // Automatically fetch interview prep questions based on new analysis
    fetchInterviewPrep(analysis.skills); 
  };
  
  const handleAddToProfile = () => {
    if (analysisResult && analyzedFileName) {
      alert(`Mock Action: "${analyzedFileName}" and its analysis would be saved to your profile.`);
    } else {
      alert("No resume analyzed yet to add to profile.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Scanner & Interview Prep</h1>
          <p className="text-muted-foreground">
            Upload your resume for AI analysis and get personalized interview practice questions.
          </p>
          {searchParams.get('resumeId') && analyzedFileName && (
             <p className="text-sm text-primary mt-1">Viewing/Re-analyzing: {analyzedFileName}</p>
          )}
        </div>
        {analysisResult && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddToProfile} variant="outline">
              <FilePlus2 className="mr-2 h-4 w-4" /> Add to My Resumes (Mock)
            </Button>
            <Button asChild>
              <Link href={{
                pathname: "/job-matcher",
                query: { resumeData: JSON.stringify(analysisResult), fileName: encodeURIComponent(analyzedFileName) } 
              }}>
                Find Matching Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      {isLoadingAnalysis ? (
        <Card>
            <CardHeader><CardTitle>Loading resume details...</CardTitle></CardHeader>
            <CardContent><p>Please wait while we fetch the resume information.</p></CardContent>
        </Card>
      ) : (
        <ResumeUploadForm onAnalysisComplete={handleAnalysisComplete} initialFileName={analyzedFileName || undefined} />
      )}

      {analysisResult && (
        <ResumeAnalysisDisplay analysis={analysisResult} fileName={analyzedFileName} />
      )}

      {isFetchingInterviewPrep && (
        <Card className="mt-10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              Generating Interview Prep...
            </CardTitle>
            <CardDescription>Our AI is crafting personalized questions and answers for you.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && !isFetchingInterviewPrep && interviewPrepData && (
        <InterviewPrepDisplay prepItems={interviewPrepData} />
      )}
    </div>
  );
}

function ResumeScannerPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResumeScannerPage() {
  return (
    <Suspense fallback={<ResumeScannerPageSkeleton />}>
      <ResumeScannerPageContent />
    </Suspense>
  );
}
