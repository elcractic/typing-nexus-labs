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
  const wordsPerLine = 8; // Number of words per line
  const currentLine = Math.floor(currentWordIndex / wordsPerLine);
  const currentWordInLine = currentWordIndex % wordsPerLine;
  
  // Show current line and next 2 lines
  const startWordIndex = currentLine * wordsPerLine;
  const endWordIndex = startWordIndex + (wordsPerLine * 3); // Show 3 lines
  const displayWords = words.slice(startWordIndex, endWordIndex);
  const currentWord = words[currentWordIndex];

  // Group words into lines for display
  const groupWordsIntoLines = (wordsList: string[], startIdx: number) => {
    const lines = [];
    for (let i = 0; i < wordsList.length; i += wordsPerLine) {
      lines.push({
        words: wordsList.slice(i, i + wordsPerLine),
        startIndex: startIdx + i,
        lineNumber: Math.floor((startIdx + i) / wordsPerLine)
      });
    }
    return lines;
  };

  const wordLines = groupWordsIntoLines(displayWords, startWordIndex);

  const getWordStyle = (wordIndex: number, word: string, lineNumber: number) => {
    if (wordIndex < currentWordIndex) {
      // Completed words - only show if in current line
      if (lineNumber === currentLine) {
        return "text-success bg-success/20 px-2 py-1 rounded font-medium border border-success/30";
      } else {
        return "opacity-0"; // Hide completed lines
      }
    } else if (wordIndex === currentWordIndex) {
      // Current word
      const isCorrect = currentInput.trim() === "" || word.startsWith(currentInput.trim());
      return isCorrect 
        ? "text-primary bg-primary/30 px-2 py-1 rounded border-2 border-primary/50 font-bold shadow-lg" 
        : "text-destructive bg-destructive/30 px-2 py-1 rounded border-2 border-destructive/50 font-bold shadow-lg";
    } else {
      return "text-muted-foreground hover:text-foreground transition-colors"; // Upcoming words
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
          <div className="text-lg md:text-xl font-mono leading-relaxed tracking-wide min-h-[160px] flex flex-col justify-center space-y-4">
            {wordLines.map((line, lineIdx) => (
              <div 
                key={line.lineNumber}
                className={`flex gap-3 justify-center transition-all duration-500 ${
                  line.lineNumber < currentLine ? 'animate-fade-out opacity-0 -translate-y-4' : 'animate-fade-in'
                }`}
              >
                {line.words.map((word, wordIdx) => {
                  const wordIndex = line.startIndex + wordIdx;
                  return (
                    <span
                      key={wordIndex}
                      className={`transition-all duration-300 ${getWordStyle(wordIndex, word, line.lineNumber)}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            ))}
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