"use client";

import { Scenario } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/hooks";
import { CheckCircle2, Lightbulb } from "lucide-react";

interface ScenarioBriefProps {
  scenario: Scenario;
  onStart: () => void;
}

export function ScenarioBrief({ scenario, onStart }: ScenarioBriefProps) {
  const { settings } = useSettings();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="font-mono text-[10px] text-muted-foreground"
          >
            {scenario.category}
          </Badge>
          <Badge
            variant="outline"
            className="font-mono text-[10px] text-muted-foreground"
          >
            {scenario.difficulty}
          </Badge>
        </div>
        <h1 className="font-heading text-2xl">{scenario.title}</h1>
      </div>

      {/* Context */}
      <div className="border-l-4 border-primary bg-surface rounded-r-lg p-4">
        <p className="text-sm leading-relaxed text-foreground/90">
          {scenario.context}
        </p>
      </div>

      {/* Success Criteria */}
      <div className="space-y-2">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Success Criteria
        </h3>
        <ul className="space-y-1.5">
          {scenario.successCriteria.map((criterion, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/80">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Example Starters */}
      {settings.showExampleStarters && scenario.exampleStarters.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <Lightbulb className="h-3 w-3" />
            Example Starters
          </h3>
          <div className="space-y-1.5">
            {scenario.exampleStarters.map((starter, i) => (
              <p
                key={i}
                className="text-sm text-muted-foreground italic pl-4 border-l-2 border-border"
              >
                &ldquo;{starter}&rdquo;
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Start Button */}
      <div className="pt-4 flex justify-center">
        <Button
          size="lg"
          onClick={onStart}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono px-8"
        >
          Ready to Practice
        </Button>
      </div>
    </div>
  );
}
