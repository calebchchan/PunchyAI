"use client";

import { Mic, Square } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function RecordButton({
  isRecording,
  onToggle,
  disabled,
}: RecordButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className="relative group"
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {/* Pulsing ring when recording */}
      {isRecording && (
        <span className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
      )}

      {/* Outer ring */}
      <span
        className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-200 ${
          isRecording
            ? "bg-destructive shadow-lg shadow-destructive/25"
            : "bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isRecording ? (
          <Square className="h-7 w-7 text-white fill-white" />
        ) : (
          <Mic className="h-8 w-8 text-primary-foreground" />
        )}
      </span>

      {/* Label */}
      <span
        className={`block mt-2 text-xs font-mono ${
          isRecording ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {isRecording ? "Stop" : "Record"}
      </span>
    </button>
  );
}
