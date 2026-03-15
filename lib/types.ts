export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ScenarioCategory =
  | "Investment Pitch"
  | "Client & Sales Communication"
  | "Small Talk & Networking"
  | "Internal Communication";

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  difficulty: Difficulty;
  durationSeconds: number;
  context: string;
  successCriteria: string[];
  exampleStarters: string[];
}

export interface FeedbackScores {
  clarity: number;
  conciseness: number;
  impact: number;
  structure: number;
  overall: number;
}

export interface FeedbackResult {
  scores: FeedbackScores;
  strengths: string[];
  improvements: string[];
  rewrite: string;
  oneLineTip: string;
}

export interface SessionRecord {
  id: string;
  scenarioId: string;
  timestamp: number;
  durationSeconds: number;
  transcript: string;
  feedback: FeedbackResult;
}

export interface UserSettings {
  showExampleStarters: boolean;
  autoAdvanceAfterFeedback: boolean;
  defaultDuration: 30 | 60 | 90 | 0;
  userRole: string;
  targetImprovementArea: string;
}
