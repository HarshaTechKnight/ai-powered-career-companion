
"use client"; 

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeUploadForm } from '@/components/resume-scanner/ResumeUploadForm';
import { ResumeAnalysisDisplay } from '@/components/resume-scanner/ResumeAnalysisDisplay';
import type { AnalyzedResume } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, FilePlus2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// This function should not be default exported
function ResumeScannerPageContent() {
  const searchParams = useSearchParams();
  const [analysisResult, setAnalysisResult] = useState<AnalyzedResume | null>(null);
  const [analyzedFileName, setAnalyzedFileName] = useState<string>("");
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false); // For initial load if resumeId is present

  // Mock function to fetch resume data if an ID is provided
  // In a real app, this would be an API call.
  useEffect(() => {
    const resumeId = searchParams.get('resumeId');
    const fileName = searchParams.get('fileName'); // Get filename if passed
    if (resumeId) {
      setIsLoadingAnalysis(true);
      // Simulate fetching data
      setTimeout(() => {
        // This is where you'd fetch the StoredResume by ID and cast/map to AnalyzedResume
        // For now, let's mock a basic structure or a message.
        // This example doesn't have the full StoredResume[] available client-side without more complex state management.
        // So, we'll just acknowledge the ID for now.
        // If you had a client-side store of resumes, you could load it here.
        console.log("Attempting to load analysis for resume ID:", resumeId);
        // For a real scenario, you'd fetch and then:
        // setAnalysisResult(fetchedResumeData); 
        // setAnalyzedFileName(fetchedResumeData.fileName);
        if (fileName) {
            setAnalyzedFileName(decodeURIComponent(fileName));
        }
        // For this mock, we assume if resumeId is present, it's for re-analysis or viewing
        // We won't pre-fill the analysis result from here to keep it simple.
        // The user would re-upload or the form would be pre-filled if we had that data.
        setIsLoadingAnalysis(false);
      }, 500);
    }
  }, [searchParams]);


  const handleAnalysisComplete = (analysis: AnalyzedResume, fileName: string) => {
    setAnalysisResult(analysis);
    setAnalyzedFileName(fileName);
  };
  
  const handleAddToProfile = () => {
    // Mock action: In a real app, this would save the analysisResult and fileName
    // to the user's profile (e.g., via an API call to your backend).
    if (analysisResult && analyzedFileName) {
      alert(`Mock Action: "${analyzedFileName}" and its analysis would be saved to your profile.`);
      // Here you might update a global state, or refetch profile data.
    } else {
      alert("No resume analyzed yet to add to profile.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Scanner</h1>
          <p className="text-muted-foreground">
            Upload your resume to get an AI-powered analysis of your skills, experience, and education.
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
                query: { resumeData: JSON.stringify(analysisResult) } 
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
    </div>
  );
}


// This function should not be default exported
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
