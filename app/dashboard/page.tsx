import { DashboardContent } from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl">Progress Dashboard</h1>
        <p className="text-muted-foreground text-xs font-mono mt-1">
          Track your communication skills over time
        </p>
      </div>
      <DashboardContent />
    </div>
  );
}
