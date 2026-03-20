"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
}

export function TranscriptDisplay({
  transcript,
  interimTranscript,
}: TranscriptDisplayProps) {
  const hasContent = transcript.length > 0 || interimTranscript.length > 0;
  const wordCount = transcript
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return (
    <div className="w-full">
      <ScrollArea className="bg-surface rounded-lg border border-border p-5 min-h-[180px] max-h-[300px]">
        {hasContent ? (
          <p className="text-sm leading-relaxed">
            <span className="text-foreground">{transcript}</span>
            {interimTranscript && (
              <span className="text-muted-foreground italic">
                {interimTranscript}
              </span>
            )}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            Start speaking...
          </p>
        )}
      </ScrollArea>
      <div className="flex justify-end mt-1.5">
        <span className="text-[10px] font-mono text-muted-foreground">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
      </div>
    </div>
  );
}
