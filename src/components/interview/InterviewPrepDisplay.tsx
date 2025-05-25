
"use client";

import type { InterviewPrepItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageSquareText, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InterviewPrepDisplayProps {
  prepItems: InterviewPrepItem[];
}

export function InterviewPrepDisplay({ prepItems }: InterviewPrepDisplayProps) {
  if (!prepItems || prepItems.length === 0) {
    return (
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Interview Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No interview preparation questions available at the moment. This might happen if the AI couldn't generate questions based on the provided skills.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-10 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl">AI-Powered Interview Practice</CardTitle>
        </div>
        <CardDescription>
          Based on your resume skills, here are some practice questions with sample answers.
          Use these to prepare, but always tailor answers to your own experiences!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {prepItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3 w-full">
                  <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="flex-1 font-medium text-base">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-1">
                <div className="space-y-3 pl-8">
                  {item.category && (
                    <Badge variant="outline" className="mb-2 text-xs border-accent text-accent">{item.category}</Badge>
                  )}
                  <div className="flex items-start gap-3">
                    <MessageSquareText className="h-5 w-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-secondary-foreground mb-1">Sample Answer:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{item.sampleAnswer}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
