"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getScenarioById } from "@/lib/scenarios";

export function Header() {
  const pathname = usePathname();

  let breadcrumbs: { label: string; muted?: boolean }[] = [];

  if (pathname === "/") {
    breadcrumbs = [{ label: "Scenarios" }];
  } else if (pathname === "/dashboard") {
    breadcrumbs = [{ label: "Progress Dashboard" }];
  } else if (pathname.startsWith("/practice/")) {
    const id = pathname.split("/practice/")[1];
    const scenario = getScenarioById(id);
    if (scenario) {
      breadcrumbs = [
        { label: scenario.category, muted: true },
        { label: scenario.title },
      ];
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-muted-foreground">/</span>
            )}
            <span
              className={
                crumb.muted
                  ? "text-muted-foreground font-mono text-xs"
                  : "text-foreground"
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>
    </header>
  );
}
