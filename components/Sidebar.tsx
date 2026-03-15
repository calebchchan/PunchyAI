"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, getScenariosByCategory } from "@/lib/scenarios";
import { Difficulty } from "@/lib/types";
import { BarChart3, Settings, Zap } from "lucide-react";
import { SettingsDialog } from "./SettingsDialog";
import { useState } from "react";

function difficultyColor(d: Difficulty): string {
  switch (d) {
    case "Beginner":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "Intermediate":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Advanced":
      return "bg-red-500/20 text-red-400 border-red-500/30";
  }
}

export function AppSidebar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            <span className="font-heading text-xl text-secondary tracking-tight">
              PunchyAI
            </span>
          </Link>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
            Communication Coach
          </p>
        </SidebarHeader>

        <SidebarContent>
          {CATEGORIES.map((category) => {
            const scenarios = getScenariosByCategory(category);
            return (
              <SidebarGroup key={category}>
                <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {category}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuSub>
                        {scenarios.map((scenario) => {
                          const isActive =
                            pathname === `/practice/${scenario.id}`;
                          return (
                            <SidebarMenuSubItem key={scenario.id}>
                              <SidebarMenuSubButton
                                isActive={isActive}
                                render={
                                  <Link href={`/practice/${scenario.id}`} />
                                }
                              >
                                <span className="flex-1 truncate text-xs">
                                  {scenario.title}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`ml-1 text-[9px] px-1 py-0 leading-tight font-mono ${difficultyColor(
                                    scenario.difficulty
                                  )}`}
                                >
                                  {scenario.difficulty[0]}
                                </Badge>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/dashboard"}
                    render={<Link href="/dashboard" />}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Progress Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSettingsOpen(true)}>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border px-4 py-3">
          <p className="text-[10px] font-mono text-muted-foreground">
            v0.1.0 MVP
          </p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
