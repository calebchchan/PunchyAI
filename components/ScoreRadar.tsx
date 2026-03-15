"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { FeedbackScores } from "@/lib/types";

interface ScoreRadarProps {
  scores: FeedbackScores;
}

export function ScoreRadar({ scores }: ScoreRadarProps) {
  const data = [
    { subject: "Clarity", score: scores.clarity },
    { subject: "Conciseness", score: scores.conciseness },
    { subject: "Impact", score: scores.impact },
    { subject: "Structure", score: scores.structure },
    { subject: "Overall", score: scores.overall },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#1E2D3D" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: "#64748B",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tick={{ fill: "#64748B", fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          dataKey="score"
          stroke="#6B9BF2"
          fill="#6B9BF2"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
