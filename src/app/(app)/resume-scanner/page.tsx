"use client"; // This page needs to be a client component to manage state

import { useState } from 'react';
import { ResumeUploadForm } from '@/components/resume-scanner/ResumeUploadForm';
import { ResumeAnalysisDisplay } from '@/components/resume-scanner/ResumeAnalysisDisplay';
import type { AnalyzedResume } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// No metadata export from client component. It should be in a parent server component or layout.
// export const metadata: Metadata = { ... }

export default function ResumeScannerPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzedResume | null>(null);
  const [analyzedFileName, setAnalyzedFileName] = useState<string>("");

  const handleAnalysisComplete = (analysis: AnalyzedResume, fileName: string) => {
    setAnalysisResult(analysis);
    setAnalyzedFileName(fileName);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Scanner</h1>
          <p className="text-muted-foreground">
            Upload your resume to get an AI-powered analysis of your skills, experience, and education.
          </p>
        </div>
        {analysisResult && (
           <Button asChild>
            <Link href={{
              pathname: "/job-matcher",
              query: { resumeData: JSON.stringify(analysisResult) } // Pass data to job matcher
            }}>
              Find Matching Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      
      <ResumeUploadForm onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <ResumeAnalysisDisplay analysis={analysisResult} fileName={analyzedFileName} />
      )}
    </div>
  );
}

// If metadata is needed, it must be defined in a parent server component or layout for this route.
// For now, the (app)/layout.tsx or root layout would define general metadata.
// Individual page titles can be set using `document.title` in a useEffect if needed for client components,
// or by structuring so a server component wraps this client component and exports metadata.
// Since this is a full page, it's better to ensure its parent layout handles titles or make this a server component that passes client state down.
// Given the state management here, keeping it client is fine for now.
