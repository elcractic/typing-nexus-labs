import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Target, Zap, AlertCircle, RotateCcw, Share } from "lucide-react";
import { TestSettings, TypingStats } from "./TypingPractice";

interface TypingResultsProps {
  stats: TypingStats;
  onRestart: () => void;
  settings: TestSettings;
}

export const TypingResults = ({ stats, onRestart, settings }: TypingResultsProps) => {
  const getPerformanceLevel = () => {
    if (stats.wpm >= 80) return { level: "Expert", color: "text-success", icon: Trophy };
    if (stats.wpm >= 60) return { level: "Advanced", color: "text-primary", icon: Target };
    if (stats.wpm >= 40) return { level: "Intermediate", color: "text-accent", icon: Zap };
    return { level: "Beginner", color: "text-muted-foreground", icon: AlertCircle };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  const getAccuracyColor = () => {
    if (stats.accuracy >= 95) return "text-success";
    if (stats.accuracy >= 90) return "text-primary";
    if (stats.accuracy >= 80) return "text-accent";
    return "text-destructive";
  };

  const shareResults = () => {
    const text = `I just typed ${stats.wpm} WPM with ${stats.accuracy}% accuracy on NeoType! 🚀`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 neon-glow-strong bg-card/30 backdrop-blur text-center">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <PerformanceIcon className={`w-8 h-8 ${performance.color}`} />
              <h2 className="text-3xl font-bold">Test Complete!</h2>
            </div>
            <p className={`text-xl ${performance.color} font-semibold`}>
              Performance Level: {performance.level}
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 neon-glow bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-accent" />
                <span className="text-lg font-semibold">Words Per Minute</span>
              </div>
              <div className="text-4xl font-bold text-accent mb-2">{stats.wpm}</div>
              <div className="text-sm text-muted-foreground">
                {stats.wpm >= 40 ? "Great speed!" : "Keep practicing!"}
              </div>
            </Card>

            <Card className="p-6 neon-glow bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Target className="w-6 h-6 text-success" />
                <span className="text-lg font-semibold">Accuracy</span>
              </div>
              <div className={`text-4xl font-bold mb-2 ${getAccuracyColor()}`}>
                {stats.accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.accuracy >= 95 ? "Excellent!" : stats.accuracy >= 90 ? "Very good!" : "Room for improvement"}
              </div>
            </Card>

            <Card className="p-6 neon-glow bg-background/50 backdrop-blur">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <span className="text-lg font-semibold">Errors</span>
              </div>
              <div className="text-4xl font-bold text-destructive mb-2">{stats.errors}</div>
              <div className="text-sm text-muted-foreground">
                {stats.errors === 0 ? "Perfect!" : stats.errors <= 3 ? "Not bad!" : "Focus on accuracy"}
              </div>
            </Card>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-background/30 rounded-lg p-3">
              <div className="text-muted-foreground">Total Characters</div>
              <div className="text-lg font-semibold">{stats.totalChars}</div>
            </div>
            <div className="bg-background/30 rounded-lg p-3">
              <div className="text-muted-foreground">Correct Characters</div>
              <div className="text-lg font-semibold text-success">{stats.correctChars}</div>
            </div>
            <div className="bg-background/30 rounded-lg p-3">
              <div className="text-muted-foreground">Test Mode</div>
              <div className="text-lg font-semibold capitalize">
                {settings.mode.replace("-", " ")}
              </div>
            </div>
            <div className="bg-background/30 rounded-lg p-3">
              <div className="text-muted-foreground">Test Type</div>
              <div className="text-lg font-semibold">
                {settings.testType === "time" 
                  ? `${settings.duration}s` 
                  : `${settings.wordCount} words`
                }
              </div>
            </div>
          </div>

          {/* Tips */}
          <Card className="p-4 bg-primary/10 border-primary/20">
            <h3 className="font-semibold text-primary mb-2">💡 Tips to Improve</h3>
            <div className="text-sm space-y-1 text-left">
              {stats.accuracy < 90 && (
                <p>• Focus on accuracy first - speed will follow naturally</p>
              )}
              {stats.wpm < 40 && (
                <p>• Practice regularly, even 10-15 minutes daily makes a difference</p>
              )}
              {stats.errors > 5 && (
                <p>• Slow down and focus on correct finger positioning</p>
              )}
              <p>• Keep your wrists straight and fingers curved</p>
              <p>• Don't look at the keyboard - trust muscle memory</p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRestart}
              size="lg"
              className="neon-glow"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={shareResults}
              variant="outline"
              size="lg"
              className="neon-glow"
            >
              <Share className="w-5 h-5 mr-2" />
              Share Results
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};