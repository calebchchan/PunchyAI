"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RecordButton } from "./RecordButton";
import { TranscriptDisplay } from "./TranscriptDisplay";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { useSettings } from "@/lib/hooks";
import { Send, AlertCircle } from "lucide-react";

interface RecordingPanelProps {
  onSubmit: (transcript: string, durationSeconds: number) => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RecordingPanel({ onSubmit }: RecordingPanelProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const { settings } = useSettings();
  const [elapsed, setElapsed] = useState(0);
  const [manualTranscript, setManualTranscript] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const targetDuration = settings.defaultDuration || 0;

  // Timer
  useEffect(() => {
    if (isListening) {
      setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isListening]);

  // Auto-stop when target duration reached
  useEffect(() => {
    if (targetDuration > 0 && elapsed >= targetDuration && isListening) {
      stopListening();
    }
  }, [elapsed, targetDuration, isListening, stopListening]);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const finalTranscript = isSupported ? transcript : manualTranscript;
  const canSubmit = finalTranscript.trim().length > 0 && !isListening;

  const handleSubmit = () => {
    onSubmit(finalTranscript.trim(), elapsed);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
      {/* Timer */}
      <div className="text-center">
        <span className="font-mono text-4xl text-foreground tabular-nums">
          {formatTime(elapsed)}
        </span>
        {targetDuration > 0 && (
          <div className="mt-2 w-48">
            <Progress
              value={Math.min((elapsed / targetDuration) * 100, 100)}
              className="h-1"
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              Target: {formatTime(targetDuration)}
            </span>
          </div>
        )}
      </div>

      {/* Transcript or manual input */}
      {isSupported ? (
        <TranscriptDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
        />
      ) : (
        <div className="w-full space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <AlertCircle className="h-3.5 w-3.5" />
            <span className="font-mono">
              Speech recognition not available. Type your response instead.
            </span>
          </div>
          <Textarea
            placeholder="Type your pitch here..."
            className="bg-surface border-border min-h-[180px] text-sm"
            value={manualTranscript}
            onChange={(e) => setManualTranscript(e.target.value)}
          />
        </div>
      )}

      {/* Record Button */}
      {isSupported && (
        <RecordButton isRecording={isListening} onToggle={handleToggle} />
      )}

      {/* Submit */}
      {canSubmit && (
        <Button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono gap-2"
          size="lg"
        >
          <Send className="h-4 w-4" />
          Get AI Feedback
        </Button>
      )}
    </div>
  );
}
