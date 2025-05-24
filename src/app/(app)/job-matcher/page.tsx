
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobSearchForm } from '@/components/job-matcher/JobSearchForm';
import { JobResultsDisplay } from '@/components/job-matcher/JobResultsDisplay';
import { RecommendedJobsDisplay } from '@/components/job-matcher/RecommendedJobsDisplay';
import type { AnalyzedResume, JobMatchResult, RecommendedJob } from '@/types';
import { Button } from '@/components/ui/button';
import { Terminal, Sparkles, Loader2, AlertTriangle, Lightbulb, FilePlus2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { recommendJobs, type JobRecommenderInput, type JobRecommenderOutput } from '@/ai/flows/job-recommender';
import { ResumeUploadForm } from '@/components/resume-scanner/ResumeUploadForm'; // Import ResumeUploadForm

function JobMatcherContent() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<AnalyzedResume | null>(null);
  const [analyzedFileName, setAnalyzedFileName] = useState<string | null>(null);
  
  // State for single job match
  const [singleMatchResult, setSingleMatchResult] = useState<JobMatchResult | null>(null);
  const [jobDescriptionForDisplay, setJobDescriptionForDisplay] = useState<string | undefined>(undefined);

  // State for AI recommendations
  const [recommendedJobsList, setRecommendedJobsList] = useState<RecommendedJob[] | null>(null);
  const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);

  useEffect(() => {
    const resumeDataString = searchParams.get('resumeData');
    const fileNameString = searchParams.get('fileName'); // If passed from resume scanner
    if (resumeDataString) {
      try {
        const parsedData = JSON.parse(resumeDataString);
        setResumeData(parsedData);
        if (fileNameString) {
          setAnalyzedFileName(decodeURIComponent(fileNameString));
        } else {
          setAnalyzedFileName("Resume from previous step");
        }
      } catch (error) {
        console.error("Failed to parse resume data from URL:", error);
        toast({
          title: "Error loading resume data",
          description: "Could not parse resume data from the URL. Please try re-scanning or uploading.",
          variant: "destructive"
        });
      }
    }
  }, [searchParams]);

  const handleLocalResumeAnalysis = (analysis: AnalyzedResume, fileName: string) => {
    setResumeData(analysis);
    setAnalyzedFileName(fileName);
    // Clear previous results when a new resume is analyzed locally
    setSingleMatchResult(null);
    setJobDescriptionForDisplay(undefined);
    setRecommendedJobsList(null);
    toast({
      title: "Resume Ready",
      description: `${fileName} has been analyzed and is ready for matching/recommendations.`,
    });
  };

  const handleSingleMatchComplete = (result: JobMatchResult, jobDesc?: string) => {
    setSingleMatchResult(result);
    setJobDescriptionForDisplay(jobDesc); 
    setRecommendedJobsList(null); // Clear recommendations if a single match is performed
  };
  
  const handleGetRecommendations = async () => {
    if (!resumeData) {
      toast({
        title: "Resume Data Missing",
        description: "Please upload or analyze a resume first to get AI recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsFetchingRecommendations(true);
    setRecommendedJobsList(null); // Clear previous recommendations
    setSingleMatchResult(null); // Clear single match result
    setJobDescriptionForDisplay(undefined);

    try {
      const input: JobRecommenderInput = {
        resumeSkills: resumeData.skills.join(', '),
        resumeExperience: resumeData.experience.map(exp => `${exp.jobTitle} at ${exp.company} (${exp.duration})`).join('; '),
        resumeEducation: resumeData.education.map(edu => {
            if (typeof edu === 'string') return edu;
            return `${edu.degree} from ${edu.institution}`;
        }).join('; '),
      };

      const result: JobRecommenderOutput = await recommendJobs(input);
      
      if (result && result.recommendations) {
        setRecommendedJobsList(result.recommendations);
        toast({
          title: "Job Recommendations Loaded",
          description: "AI has suggested some job roles for you.",
        });
      } else {
        throw new Error("AI job recommendation returned no result or invalid format.");
      }
    } catch (error: any) {
      console.error("Job recommendation error:", error);
      toast({
        title: "Job Recommendation Failed",
        description: error.message || "An unexpected error occurred while fetching recommendations.",
        variant: "destructive",
        action: <AlertTriangle className="text-red-500" />,
      });
    } finally {
      setIsFetchingRecommendations(false);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Job Matcher & Recommender</h1>
        <p className="text-muted-foreground">
          {resumeData && analyzedFileName 
            ? `Using: ${analyzedFileName}. ` 
            : "Upload your resume to analyze a specific job or get AI-powered recommendations."}
        </p>
      </div>

      {!resumeData && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FilePlus2 className="h-5 w-5 text-primary" />
              Upload Your Resume
            </CardTitle>
            <CardDescription>Please upload your resume below to enable job matching and recommendation features.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploadForm onAnalysisComplete={handleLocalResumeAnalysis} />
          </CardContent>
        </Card>
      )}
      
      {resumeData && (
        <>
          {/* Section for AI Job Recommendations */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Job Recommendations
              </CardTitle>
              <CardDescription>Let our AI suggest roles based on your currently active resume analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              {analyzedFileName && (
                <p className="text-sm text-muted-foreground mb-4">
                  Using: <span className="font-semibold">{analyzedFileName}</span>
                </p>
              )}
              <Button onClick={handleGetRecommendations} disabled={isFetchingRecommendations || !resumeData} className="w-full sm:w-auto">
                {isFetchingRecommendations ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Job Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Display Recommended Jobs */}
          {isFetchingRecommendations && (
            <div className="text-center py-8">
                <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Our AI is thinking... fetching recommendations!</p>
            </div>
          )}
          {recommendedJobsList && recommendedJobsList.length > 0 && (
            <RecommendedJobsDisplay jobs={recommendedJobsList} />
          )}
          {recommendedJobsList && recommendedJobsList.length === 0 && !isFetchingRecommendations && (
             <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <p className="font-semibold">No Specific Recommendations</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    The AI couldn't pinpoint specific recommendations at this time. Try refining your resume or check again later.
                  </p>
                </CardContent>
              </Card>
          )}
          
          <Separator className="my-12" />

          {/* Section for Single Job Match */}
          <JobSearchForm 
            resumeAnalysis={resumeData} 
            onMatchComplete={handleSingleMatchComplete} // Pass the existing handler
          />

          {singleMatchResult && (
            <JobResultsDisplay matchResult={singleMatchResult} jobDescription={jobDescriptionForDisplay} />
          )}
        </>
      )}
    </div>
  );
}


export default function JobMatcherPage() {
  return (
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
      {/* Skeleton for Resume Upload Card (if no resume data) */}
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
           <Skeleton className="h-48 w-full" /> {/* Placeholder for resume upload form elements */}
           <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
      
      <Separator className="my-12" />

      {/* Skeleton for Single Job Match Form (this part might be hidden until resume is loaded) */}
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

