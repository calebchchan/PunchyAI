"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/hooks";
import { clearAllData } from "@/lib/storage";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, updateSettings, mounted } = useSettings();

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-mono">
            Customize your practice experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show example starters</Label>
            <Switch
              checked={settings.showExampleStarters}
              onCheckedChange={(checked) =>
                updateSettings({ showExampleStarters: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Auto-advance after feedback</Label>
            <Switch
              checked={settings.autoAdvanceAfterFeedback}
              onCheckedChange={(checked) =>
                updateSettings({ autoAdvanceAfterFeedback: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Default recording duration</Label>
            <Select
              value={settings.defaultDuration.toString()}
              onValueChange={(val) => {
                if (val)
                  updateSettings({
                    defaultDuration: parseInt(val) as 30 | 60 | 90 | 0,
                  });
              }
              }
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">60 seconds</SelectItem>
                <SelectItem value="90">90 seconds</SelectItem>
                <SelectItem value="0">Open-ended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Your role</Label>
            <Input
              placeholder="e.g., Equity Sales — APAC TMT"
              className="bg-background border-border text-sm"
              value={settings.userRole}
              onChange={(e) => updateSettings({ userRole: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Target improvement area</Label>
            <Textarea
              placeholder="e.g., Be more concise, Sound more confident"
              className="bg-background border-border text-sm resize-none"
              rows={2}
              value={settings.targetImprovementArea}
              onChange={(e) =>
                updateSettings({ targetImprovementArea: e.target.value })
              }
            />
          </div>

          <Separator />

          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => {
              clearAllData();
              onOpenChange(false);
            }}
          >
            Clear All Session Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
