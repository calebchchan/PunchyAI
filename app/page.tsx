import { CATEGORIES, getScenariosByCategory } from "@/lib/scenarios";
import { ScenarioCard } from "@/components/ScenarioCard";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-3xl">Communication Scenarios</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pick a scenario and practice your pitch. Get instant AI feedback.
        </p>
      </div>

      {CATEGORIES.map((category, i) => {
        const scenarios = getScenariosByCategory(category);
        return (
          <section key={category}>
            {i > 0 && <Separator className="mb-6" />}
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
