import { SessionRecord, UserSettings } from "./types";

const KEYS = {
  sessions: "punchyai-sessions",
  settings: "punchyai-settings",
} as const;

export const DEFAULT_SETTINGS: UserSettings = {
  showExampleStarters: true,
  autoAdvanceAfterFeedback: false,
  defaultDuration: 60,
  userRole: "",
  targetImprovementArea: "",
};

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getSessions(): SessionRecord[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(KEYS.sessions);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: SessionRecord): void {
  if (!isClient()) return;
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  if (!isClient()) return;
  const sessions = getSessions().filter((s) => s.id !== id);
  localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

export function getSettings(): UserSettings {
  if (!isClient()) return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(KEYS.settings);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  if (!isClient()) return;
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export function clearAllData(): void {
  if (!isClient()) return;
  localStorage.removeItem(KEYS.sessions);
  localStorage.removeItem(KEYS.settings);
}
