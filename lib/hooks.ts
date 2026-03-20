"use client";

import { useState, useEffect, useCallback } from "react";
import { SessionRecord, UserSettings } from "./types";
import {
  getSessions,
  saveSession,
  deleteSession,
  getSettings,
  saveSettings,
  DEFAULT_SETTINGS,
} from "./storage";

export function useSessionHistory() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSessions(getSessions());
    setMounted(true);
  }, []);

  const addSession = useCallback((session: SessionRecord) => {
    saveSession(session);
    setSessions(getSessions());
  }, []);

  const removeSession = useCallback((id: string) => {
    deleteSession(id);
    setSessions(getSessions());
  }, []);

  return { sessions, addSession, removeSession, mounted };
}

export function useSettings() {
  const [settings, setSettingsState] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSettingsState(getSettings());
    setMounted(true);
  }, []);

  const updateSettings = useCallback(
    (partial: Partial<UserSettings>) => {
      const next = { ...settings, ...partial };
      saveSettings(next);
      setSettingsState(next);
    },
    [settings]
  );

  return { settings, updateSettings, mounted };
}
