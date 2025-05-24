
import type { RecommendedJob } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Briefcase, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

interface RecommendedJobsDisplayProps {
  jobs: RecommendedJob[];
}

export function RecommendedJobsDisplay({ jobs }: RecommendedJobsDisplayProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        <Sparkles className="mx-auto h-12 w-12 mb-4" />
        <p>No job recommendations available at the moment.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg mt-8 w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">AI Job Recommendations</CardTitle>
        </div>
        <CardDescription>Here are some job roles our AI thinks might be a good fit for your profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Briefcase className="h-8 w-8 text-primary mb-2" />
                  {job.relevanceScore && (
                     <Badge variant="outline" className="text-xs border-primary text-primary">
                       <Star className="h-3 w-3 mr-1 fill-current" />
                       {job.relevanceScore}
                     </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{job.company}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">{job.reasoning}</p>
              </CardContent>
              <CardFooter>
                {/* In a real app, this might link to a job board or details page */}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/job-details/${job.id}`} onClick={(e) => {e.preventDefault(); alert(`Mock view details for: ${job.title}`)}}>
                    View Details (Mock)
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
