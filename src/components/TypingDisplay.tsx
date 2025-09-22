import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, Zap, TrendingUp } from "lucide-react";
import { TestSettings, TypingStats } from "./TypingPractice";

interface TypingDisplayProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  onInputChange: (input: string) => void;
  isTestActive: boolean;
  timeLeft: number;
  wordsTyped: number;
  stats: TypingStats;
  settings: TestSettings;
}

export const TypingDisplay = ({
  words,
  currentWordIndex,
  currentInput,
  onInputChange,
  isTestActive,
  timeLeft,
  wordsTyped,
  stats,
  settings,
}: TypingDisplayProps) => {
  const displayWords = words.slice(currentWordIndex, currentWordIndex + 20);
  const currentWord = words[currentWordIndex];

  const getWordStyle = (index: number, word: string) => {
    const actualIndex = currentWordIndex + index;
    
    if (actualIndex < currentWordIndex) {
      return "text-success bg-success/10 px-1 rounded"; // Completed words - keep them visible
    } else if (actualIndex === currentWordIndex) {
      // Current word - check if it matches current input
      const isCorrect = currentInput.trim() === "" || word.startsWith(currentInput.trim());
      return isCorrect ? "text-primary bg-primary/20 px-1 rounded border border-primary/30" : "text-destructive bg-destructive/20 px-1 rounded border border-destructive/30";
    } else {
      return "text-muted-foreground"; // Upcoming words
    }
  };

  const getProgress = () => {
    if (settings.testType === "time") {
      return ((settings.duration - timeLeft) / settings.duration) * 100;
    } else {
      return (wordsTyped / settings.wordCount) * 100;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center neon-glow bg-card/50 backdrop-blur">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Time</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {settings.testType === "time" ? `${timeLeft}s` : `${Math.floor((Date.now() - (Date.now() - (settings.duration - timeLeft) * 1000)) / 1000)}s`}
          </div>
        </Card>

        <Card className="p-4 text-center neon-glow bg-card/50 backdrop-blur">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">WPM</span>
          </div>
          <div className="text-2xl font-bold text-accent">{stats.wpm}</div>
        </Card>

        <Card className="p-4 text-center neon-glow bg-card/50 backdrop-blur">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-success">{stats.accuracy}%</div>
        </Card>

        <Card className="p-4 text-center neon-glow bg-card/50 backdrop-blur">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Progress</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {settings.testType === "words" ? `${wordsTyped}/${settings.wordCount}` : `${Math.round(getProgress())}%`}
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={getProgress()} className="h-2 neon-glow" />
        <div className="text-center text-sm text-muted-foreground">
          {settings.testType === "time" 
            ? `${settings.duration - timeLeft} / ${settings.duration} seconds`
            : `${wordsTyped} / ${settings.wordCount} words`
          }
        </div>
      </div>

      {/* Words Display */}
      <Card className="p-8 neon-glow-strong bg-card/30 backdrop-blur">
        <div className="text-center space-y-6">
          <div className="text-lg md:text-xl font-mono leading-relaxed tracking-wide min-h-[120px] flex items-center justify-center">
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
              {displayWords.map((word, index) => (
                <span
                  key={currentWordIndex + index}
                  className={`transition-all duration-200 ${getWordStyle(index, word)}`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            <Input
              value={currentInput}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={isTestActive ? "Keep typing..." : "Start typing to begin..."}
              className="text-center text-lg font-mono neon-glow-strong bg-background/50 backdrop-blur border-primary/30 focus:border-primary"
              autoFocus
              disabled={!words.length}
            />
          </div>

          {currentWord && (
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Current word:</div>
              <div className="text-xl font-mono text-primary font-bold">{currentWord}</div>
            </div>
          )}
        </div>
      </Card>

      {!isTestActive && currentInput === "" && (
        <div className="text-center text-muted-foreground animate-pulse">
          <p>Start typing to begin the test</p>
        </div>
      )}
    </div>
  );
};