"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // Added import
import { JobSearchForm } from '@/components/job-matcher/JobSearchForm';
import { JobResultsDisplay } from '@/components/job-matcher/JobResultsDisplay';
import type { AnalyzedResume, JobMatchResult } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Added Card imports for Skeleton


function JobMatcherContent() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<AnalyzedResume | null>(null);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [jobDescriptionForDisplay, setJobDescriptionForDisplay] = useState<string | undefined>(undefined);

  useEffect(() => {
    const resumeDataString = searchParams.get('resumeData');
    if (resumeDataString) {
      try {
        const parsedData = JSON.parse(resumeDataString);
        setResumeData(parsedData);
      } catch (error) {
        console.error("Failed to parse resume data from URL:", error);
        // Potentially show a toast or error message to the user
      }
    }
    // If no resumeData in URL, user might need to select one from their profile.
    // For this version, we rely on it being passed or they use the form with a default/selected resume.
  }, [searchParams]);

  const handleMatchComplete = (result: JobMatchResult, jobDesc?: string) => {
    setMatchResult(result);
    setJobDescriptionForDisplay(jobDesc); // Store job description if you want to display it
  };
  
  // A function to be passed to JobSearchForm to update jobDescriptionForDisplay
  const handleJobDescriptionChange = (description: string) => {
    setJobDescriptionForDisplay(description);
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Job Matcher</h1>
        <p className="text-muted-foreground">
          Paste a job description and let our AI analyze its compatibility with your resume.
        </p>
      </div>

      {!resumeData && !searchParams.get('resumeData') && ( // Show if no resume data is available at all
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Resume Data Found!</AlertTitle>
          <AlertDescription>
            Please <Link href="/resume-scanner" className="font-semibold text-primary hover:underline">scan a resume</Link> first or select one from your profile to use the job matcher.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Pass the original job description to JobSearchForm if needed, or get it from its own state */}
      <JobSearchForm 
        resumeAnalysis={resumeData} 
        onMatchComplete={(result) => handleMatchComplete(result, (document.getElementById('jobDescription') as HTMLTextAreaElement)?.value)}
      />

      {matchResult && (
        <JobResultsDisplay matchResult={matchResult} jobDescription={jobDescriptionForDisplay} />
      )}
    </div>
  );
}


export default function JobMatcherPage() {
  return (
    // Suspense is required by Next.js when using useSearchParams in a client component.
    <Suspense fallback={<JobMatcherPageSkeleton />}>
      <JobMatcherContent />
    </Suspense>
  );
}

function JobMatcherPageSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-1/4 mb-1" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

// Metadata should be handled by a server component if this page is primarily client-rendered.
// For now, this page is client-rendered due to useSearchParams and useState.
// You can add a `metadata` export if you refactor to have a Server Component parent.
