"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scenario, Difficulty } from "@/lib/types";
import { Clock, ArrowRight } from "lucide-react";

function difficultyStyle(d: Difficulty): string {
  switch (d) {
    case "Beginner":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Intermediate":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "Advanced":
      return "bg-red-500/15 text-red-400 border-red-500/30";
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec > 0 ? `${min}m ${sec}s` : `${min}m`;
}

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Link href={`/practice/${scenario.id}`}>
      <Card className="group bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className={`text-[10px] font-mono ${difficultyStyle(
                scenario.difficulty
              )}`}
            >
              {scenario.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-[10px] font-mono">
                {formatDuration(scenario.durationSeconds)}
              </span>
            </div>
          </div>
          <CardTitle className="font-heading text-base leading-snug group-hover:text-primary transition-colors">
            {scenario.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {scenario.context}
          </p>
          <div className="flex items-center gap-1 mt-3 text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono">Start Practice</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
