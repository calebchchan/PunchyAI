"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSessionHistory } from "@/lib/hooks";
import { getScenarioById } from "@/lib/scenarios";
import { SessionRecord } from "@/lib/types";
import { FeedbackCard } from "./FeedbackCard";
import {
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Eye,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";

const ScoreTrendChart = dynamic(
  () =>
    import("./ScoreTrendChart").then((m) => ({ default: m.ScoreTrendChart })),
  { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-surface rounded-lg" /> }
);

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec > 0 ? `${min}m ${sec}s` : `${min}m`;
}

function scoreBadgeColor(score: number): string {
  if (score >= 7) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (score >= 5) return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

export function DashboardContent() {
  const { sessions, removeSession, mounted } = useSessionHistory();
  const [viewSession, setViewSession] = useState<SessionRecord | null>(null);

  const stats = useMemo(() => {
    if (sessions.length === 0) return null;

    const totalSessions = sessions.length;
    const avgScore =
      sessions.reduce((sum, s) => sum + s.feedback.scores.overall, 0) /
      totalSessions;
    const totalPracticeTime = sessions.reduce(
      (sum, s) => sum + s.durationSeconds,
      0
    );

    // Most practiced category
    const categoryCounts: Record<string, number> = {};
    sessions.forEach((s) => {
      const scenario = getScenarioById(s.scenarioId);
      if (scenario) {
        categoryCounts[scenario.category] =
          (categoryCounts[scenario.category] || 0) + 1;
      }
    });
    const mostPracticed = Object.entries(categoryCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A";

    return { totalSessions, avgScore, totalPracticeTime, mostPracticed };
  }, [sessions]);

  if (!mounted) return null;

  // Empty state
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="font-heading text-xl mb-2">No Sessions Yet</h2>
        <p className="text-muted-foreground text-sm max-w-sm mb-6">
          Complete a practice session to start tracking your progress and see
          your scores over time.
        </p>
        <Button render={<Link href="/" />} className="font-mono text-xs gap-2">
          <Zap className="h-3.5 w-3.5" />
          Start Practicing
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Total Sessions
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl">{stats!.totalSessions}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Avg Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl">
              {stats!.avgScore.toFixed(1)}
              <span className="text-lg text-muted-foreground">/10</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Practice Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-3xl">
              {formatDuration(stats!.totalPracticeTime)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Top Category
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-lg leading-tight">
              {stats!.mostPracticed}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Score Trends Chart */}
      {sessions.length >= 2 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreTrendChart sessions={sessions} />
          </CardContent>
        </Card>
      )}

      {/* Session History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-heading text-lg">
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="max-h-[500px]">
            <div className="divide-y divide-border">
              {sessions
                .slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((session) => {
                  const scenario = getScenarioById(session.scenarioId);
                  return (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-surface-elevated/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {scenario?.title || session.scenarioId}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          {formatDate(session.timestamp)} at{" "}
                          {formatTime(session.timestamp)} &middot;{" "}
                          {formatDuration(session.durationSeconds)}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className={`font-mono text-xs ${scoreBadgeColor(
                          session.feedback.scores.overall
                        )}`}
                      >
                        {session.feedback.scores.overall}/10
                      </Badge>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setViewSession(session)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => removeSession(session.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* View Feedback Dialog */}
      <Dialog
        open={viewSession !== null}
        onOpenChange={(open) => !open && setViewSession(null)}
      >
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              {viewSession &&
                (getScenarioById(viewSession.scenarioId)?.title ||
                  "Session Feedback")}
            </DialogTitle>
          </DialogHeader>
          {viewSession && (
            <FeedbackCard
              feedback={viewSession.feedback}
              rawText=""
              isStreaming={false}
              error={null}
              transcript={viewSession.transcript}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
