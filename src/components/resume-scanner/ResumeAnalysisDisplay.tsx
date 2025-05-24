import type { AnalyzedResume, ResumeEducation, ResumeExperience } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Brain, Briefcase, GraduationCap, FileText } from 'lucide-react';

interface ResumeAnalysisDisplayProps {
  analysis: AnalyzedResume;
  fileName: string;
}

function isResumeEducationObject(edu: ResumeEducation | string): edu is ResumeEducation {
  return typeof edu === 'object' && edu !== null && 'degree' in edu && 'institution' in edu;
}


export function ResumeAnalysisDisplay({ analysis, fileName }: ResumeAnalysisDisplayProps) {
  if (!analysis) return null;

  return (
    <Card className="shadow-lg mt-8 w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Resume Analysis: {fileName}</CardTitle>
        </div>
        <CardDescription>Here's what our AI found in your resume.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Skills</h3>
          </div>
          {analysis.skills && analysis.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No skills extracted.</p>
          )}
        </div>

        <Separator />

        {/* Experience Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Experience</h3>
          </div>
          {analysis.experience && analysis.experience.length > 0 ? (
            <ScrollArea className="h-auto max-h-60 rounded-md border p-4">
              <ul className="space-y-4">
                {analysis.experience.map((exp, index) => (
                  <li key={index} className="p-3 bg-muted/30 rounded-md shadow-sm">
                    <p className="font-semibold text-md">{exp.jobTitle}</p>
                    <p className="text-sm text-foreground/80">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">No work experience extracted.</p>
          )}
        </div>

        <Separator />

        {/* Education Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          {analysis.education && analysis.education.length > 0 ? (
             <ScrollArea className="h-auto max-h-60 rounded-md border p-4">
              <ul className="space-y-4">
                {analysis.education.map((edu, index) => (
                  <li key={index} className="p-3 bg-muted/30 rounded-md shadow-sm">
                    {isResumeEducationObject(edu) ? (
                      <>
                        <p className="font-semibold text-md">{edu.degree}</p>
                        <p className="text-sm text-foreground/80">{edu.institution}</p>
                      </>
                    ) : (
                      <p className="font-semibold text-md">{edu}</p> // Handle plain string education entry
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">No education details extracted.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
