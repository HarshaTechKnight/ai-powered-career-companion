import type { JobMatchResult } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckBadgeIcon, LightBulbIcon } from '@heroicons/react/24/solid'; // Using Heroicons for variety, ensure installed or use Lucide
import { Star, TrendingUp, Target } from 'lucide-react';


interface JobResultsDisplayProps {
  matchResult: JobMatchResult;
  jobDescription?: string; // Optionally display part of the job description
}

export function JobResultsDisplay({ matchResult, jobDescription }: JobResultsDisplayProps) {
  if (!matchResult) return null;

  const isBestFit = matchResult.fitCategory?.toLowerCase().includes('best fit');

  return (
    <Card className="shadow-lg mt-8 w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
            {isBestFit ? <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" /> : <TrendingUp className="h-6 w-6 text-primary" />}
            <CardTitle className="text-2xl">Job Match Analysis</CardTitle>
        </div>
        <CardDescription>AI-powered insights on how this job aligns with your profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Fit Category</h3>
          </div>
          <Badge 
            className={`text-lg px-4 py-2 font-semibold ${isBestFit ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700' : 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700'}`}
            variant="outline"
          >
            {matchResult.fitCategory || "N/A"}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2">
            {isBestFit 
              ? "This job appears to be an excellent match for your skills and experience." 
              : "This role could be a good growth opportunity, potentially requiring some skill development."}
          </p>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Relevance Ranking</h3>
          </div>
          <p className="text-xl font-bold text-primary">{matchResult.jobRanking || "N/A"}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Our AI's assessment of how well this job posting aligns with your resume.
          </p>
        </div>

        {jobDescription && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Job Description Snippet</h3>
            <p className="text-sm text-muted-foreground max-h-24 overflow-y-auto p-2 border rounded-md bg-muted/50">
              {jobDescription.substring(0, 300)}{jobDescription.length > 300 && "..."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
