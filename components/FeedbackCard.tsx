"use client";

import dynamic from "next/dynamic";
import { FeedbackResult } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ArrowUpCircle, Lightbulb, ArrowDown } from "lucide-react";

const ScoreRadar = dynamic(
  () => import("./ScoreRadar").then((m) => ({ default: m.ScoreRadar })),
  { ssr: false, loading: () => <Skeleton className="h-[260px] w-full" /> }
);

interface FeedbackCardProps {
  feedback: FeedbackResult | null;
  rawText: string;
  isStreaming: boolean;
  error: string | null;
  transcript: string;
}

function scoreColor(score: number): string {
  if (score >= 7) return "text-emerald-400";
  if (score >= 5) return "text-primary";
  return "text-destructive";
}

function scoreBadge(score: number): string {
  if (score >= 7) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (score >= 5) return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

const SCORE_LABELS: { key: keyof FeedbackResult["scores"]; label: string }[] = [
  { key: "clarity", label: "Clarity" },
  { key: "conciseness", label: "Conciseness" },
  { key: "impact", label: "Impact" },
  { key: "structure", label: "Structure" },
];

export function FeedbackCard({
  feedback,
  rawText,
  isStreaming,
  error,
  transcript,
}: FeedbackCardProps) {
  // Error state
  if (error) {
    return (
      <Card className="bg-card border-border max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // Loading / streaming skeleton
  if (isStreaming || !feedback) {
    return (
      <Card className="bg-card border-border max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {rawText ? (
            <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap bg-surface rounded-lg p-4 max-h-[300px] overflow-auto">
              {rawText}
              <span className="animate-pulse">|</span>
            </pre>
          ) : (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border max-w-2xl mx-auto">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl">AI Feedback</h2>
          <Badge
            variant="outline"
            className={`text-lg font-mono px-3 py-1 ${scoreBadge(
              feedback.scores.overall
            )}`}
          >
            {feedback.scores.overall}/10
          </Badge>
        </div>
        {/* One-liner tip */}
        <div className="flex items-start gap-2 bg-primary/10 border border-primary/20 rounded-lg p-3">
          <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm font-mono text-primary">{feedback.oneLineTip}</p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface">
            <TabsTrigger value="scores" className="font-mono text-xs">
              Scores
            </TabsTrigger>
            <TabsTrigger value="strengths" className="font-mono text-xs">
              Strengths
            </TabsTrigger>
            <TabsTrigger value="improve" className="font-mono text-xs">
              Improve
            </TabsTrigger>
            <TabsTrigger value="rewrite" className="font-mono text-xs">
              Rewrite
            </TabsTrigger>
          </TabsList>

          {/* Scores Tab */}
          <TabsContent value="scores" className="space-y-6 pt-4">
            <ScoreRadar scores={feedback.scores} />
            <div className="space-y-3">
              {SCORE_LABELS.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-24">
                    {label}
                  </span>
                  <div className="flex-1">
                    <Progress
                      value={feedback.scores[key] * 10}
                      className="h-2"
                    />
                  </div>
                  <span
                    className={`font-mono text-sm font-medium w-8 text-right ${scoreColor(
                      feedback.scores[key]
                    )}`}
                  >
                    {feedback.scores[key]}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Strengths Tab */}
          <TabsContent value="strengths" className="pt-4">
            <ul className="space-y-2.5">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{s}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Improvements Tab */}
          <TabsContent value="improve" className="pt-4">
            <ul className="space-y-2.5">
              {feedback.improvements.map((imp, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <ArrowUpCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{imp}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Rewrite Tab */}
          <TabsContent value="rewrite" className="space-y-4 pt-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Your Version
              </p>
              <div className="bg-surface rounded-lg p-3 text-sm text-muted-foreground italic">
                &ldquo;{transcript}&rdquo;
              </div>
            </div>
            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                Punchier Version
              </p>
              <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-3 text-sm text-foreground leading-relaxed">
                &ldquo;{feedback.rewrite}&rdquo;
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
