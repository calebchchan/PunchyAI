import { getScenarioById } from "@/lib/scenarios";
import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  if (!scenario) notFound();

  return <PracticeSession scenario={scenario} />;
}
