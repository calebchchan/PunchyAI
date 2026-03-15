"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SessionRecord } from "@/lib/types";

interface ScoreTrendChartProps {
  sessions: SessionRecord[];
}

const DIMENSION_COLORS: Record<string, string> = {
  clarity: "#6B9BF2",
  conciseness: "#C9A962",
  impact: "#4ADE80",
  structure: "#F87171",
  overall: "#8B5CF6",
};

const DIMENSION_LABELS: Record<string, string> = {
  clarity: "Clarity",
  conciseness: "Conciseness",
  impact: "Impact",
  structure: "Structure",
  overall: "Overall",
};

export function ScoreTrendChart({ sessions }: ScoreTrendChartProps) {
  const data = sessions
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((s, i) => ({
      name: `#${i + 1}`,
      date: new Date(s.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clarity: s.feedback.scores.clarity,
      conciseness: s.feedback.scores.conciseness,
      impact: s.feedback.scores.impact,
      structure: s.feedback.scores.structure,
      overall: s.feedback.scores.overall,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
        <XAxis
          dataKey="date"
          stroke="#64748B"
          fontSize={11}
          fontFamily="var(--font-mono)"
          tickLine={false}
        />
        <YAxis
          domain={[0, 10]}
          stroke="#64748B"
          fontSize={11}
          fontFamily="var(--font-mono)"
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1E2D3D",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
          }}
          labelStyle={{ color: "#F1F5F9" }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
          }}
        />
        {Object.entries(DIMENSION_COLORS).map(([key, color]) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={DIMENSION_LABELS[key]}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
