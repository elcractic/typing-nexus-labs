import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Timer, Hash, Keyboard } from "lucide-react";
import { TestSettings, TypingMode, TestType } from "./TypingPractice";

interface TypingSettingsProps {
  settings: TestSettings;
  onSettingsChange: (settings: TestSettings) => void;
  onReset: () => void;
  isTestActive: boolean;
}

export const TypingSettings = ({
  settings,
  onSettingsChange,
  onReset,
  isTestActive,
}: TypingSettingsProps) => {
  const updateSettings = (key: keyof TestSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="p-6 neon-glow bg-card/50 backdrop-blur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Test Type Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Timer className="w-4 h-4 text-primary" />
            Test Type
          </Label>
          <Select
            value={settings.testType}
            onValueChange={(value: TestType) => updateSettings("testType", value)}
            disabled={isTestActive}
          >
            <SelectTrigger className="neon-glow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration/Word Count */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            {settings.testType === "time" ? (
              <>
                <Timer className="w-4 h-4 text-primary" />
                Duration (seconds)
              </>
            ) : (
              <>
                <Hash className="w-4 h-4 text-primary" />
                Word Count
              </>
            )}
          </Label>
          {settings.testType === "time" ? (
            <Select
              value={settings.duration.toString()}
              onValueChange={(value) => updateSettings("duration", parseInt(value))}
              disabled={isTestActive}
            >
              <SelectTrigger className="neon-glow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15s</SelectItem>
                <SelectItem value="30">30s</SelectItem>
                <SelectItem value="60">60s</SelectItem>
                <SelectItem value="120">2 min</SelectItem>
                <SelectItem value="300">5 min</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              type="number"
              min="10"
              max="500"
              value={settings.wordCount}
              onChange={(e) => updateSettings("wordCount", parseInt(e.target.value) || 50)}
              disabled={isTestActive}
              className="neon-glow"
            />
          )}
        </div>

        {/* Typing Mode */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Keyboard className="w-4 h-4 text-primary" />
            Mode
          </Label>
          <Select
            value={settings.mode}
            onValueChange={(value: TypingMode) => updateSettings("mode", value)}
            disabled={isTestActive}
          >
            <SelectTrigger className="neon-glow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="left-hand">Left Hand Only</SelectItem>
              <SelectItem value="right-hand">Right Hand Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="space-y-2">
          <Label className="text-sm font-medium opacity-0">Actions</Label>
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full neon-glow"
            disabled={false}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};