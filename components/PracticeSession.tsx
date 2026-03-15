"use client";

import { useState, useCallback } from "react";
import { Scenario } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScenarioBrief } from "./ScenarioBrief";
import { RecordingPanel } from "./RecordingPanel";
import { FeedbackCard } from "./FeedbackCard";
import { useStreamingFeedback } from "@/lib/useStreamingFeedback";
import { useSettings, useSessionHistory } from "@/lib/hooks";
import { SCENARIOS } from "@/lib/scenarios";
import { RotateCcw, SkipForward, Save, Check } from "lucide-react";
import Link from "next/link";

type PracticeStep = "brief" | "recording" | "feedback";

interface PracticeSessionProps {
  scenario: Scenario;
}

export function PracticeSession({ scenario }: PracticeSessionProps) {
  const [step, setStep] = useState<PracticeStep>("brief");
  const [transcript, setTranscript] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [saved, setSaved] = useState(false);

  const { rawText, feedback, isStreaming, error, fetchFeedback, reset } =
    useStreamingFeedback();
  const { settings } = useSettings();
  const { addSession } = useSessionHistory();

  const handleStartRecording = useCallback(() => {
    setStep("recording");
    setTranscript("");
    setDurationSeconds(0);
    setSaved(false);
    reset();
  }, [reset]);

  const handleSubmitTranscript = useCallback(
    (text: string, duration: number) => {
      setTranscript(text);
      setDurationSeconds(duration);
      setStep("feedback");
      fetchFeedback({
        transcript: text,
        scenarioId: scenario.id,
        durationSeconds: duration,
        userRole: settings.userRole || undefined,
        targetArea: settings.targetImprovementArea || undefined,
      });
    },
    [fetchFeedback, scenario.id, settings.userRole, settings.targetImprovementArea]
  );

  const handleTryAgain = useCallback(() => {
    handleStartRecording();
  }, [handleStartRecording]);

  const handleSave = useCallback(() => {
    if (!feedback) return;
    addSession({
      id: crypto.randomUUID(),
      scenarioId: scenario.id,
      timestamp: Date.now(),
      durationSeconds,
      transcript,
      feedback,
    });
    setSaved(true);
  }, [feedback, addSession, scenario.id, durationSeconds, transcript]);

  // Find next scenario
  const currentIndex = SCENARIOS.findIndex((s) => s.id === scenario.id);
  const nextScenario =
    currentIndex >= 0 && currentIndex < SCENARIOS.length - 1
      ? SCENARIOS[currentIndex + 1]
      : null;

  return (
    <div className="max-w-3xl mx-auto">
      {step === "brief" && (
        <ScenarioBrief scenario={scenario} onStart={handleStartRecording} />
      )}

      {step === "recording" && (
        <RecordingPanel onSubmit={handleSubmitTranscript} />
      )}

      {step === "feedback" && (
        <div className="space-y-6">
          <FeedbackCard
            feedback={feedback}
            rawText={rawText}
            isStreaming={isStreaming}
            error={error}
            transcript={transcript}
          />

          {/* Action buttons — show only after feedback is complete */}
          {feedback && !isStreaming && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={handleTryAgain}
                className="gap-2 font-mono text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Try Again
              </Button>

              {nextScenario && (
                <Button
                  variant="outline"
                  className="gap-2 font-mono text-xs"
                  render={<Link href={`/practice/${nextScenario.id}`} />}
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Next Scenario
                </Button>
              )}

              <Button
                onClick={handleSave}
                disabled={saved}
                className="gap-2 font-mono text-xs bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {saved ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    Save to History
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
