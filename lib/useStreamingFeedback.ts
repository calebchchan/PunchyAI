"use client";

import { useState, useCallback } from "react";
import { FeedbackResult } from "./types";

export function useStreamingFeedback() {
  const [rawText, setRawText] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(
    async (params: {
      transcript: string;
      scenarioId: string;
      durationSeconds: number;
      userRole?: string;
      targetArea?: string;
    }) => {
      setIsStreaming(true);
      setRawText("");
      setFeedback(null);
      setError(null);

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setRawText(accumulated);
                }
                if (parsed.error) {
                  setError(parsed.error);
                }
              } catch {
                // Partial JSON chunk, skip
              }
            }
          }
        }

        // Parse the complete JSON
        try {
          // Strip markdown fences if present
          let cleaned = accumulated.trim();
          if (cleaned.startsWith("```json")) {
            cleaned = cleaned.slice(7);
          } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.slice(3);
          }
          if (cleaned.endsWith("```")) {
            cleaned = cleaned.slice(0, -3);
          }
          cleaned = cleaned.trim();

          const parsed = JSON.parse(cleaned);
          setFeedback({
            scores: parsed.scores,
            strengths: parsed.strengths || [],
            improvements: parsed.improvements || [],
            rewrite: parsed.rewrite || "",
            oneLineTip: parsed.oneLineTip || parsed.one_liner_tip || "",
          });
        } catch {
          setError("Failed to parse AI feedback. Please try again.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Network error. Please try again."
        );
      } finally {
        setIsStreaming(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setRawText("");
    setFeedback(null);
    setIsStreaming(false);
    setError(null);
  }, []);

  return { rawText, feedback, isStreaming, error, fetchFeedback, reset };
}
