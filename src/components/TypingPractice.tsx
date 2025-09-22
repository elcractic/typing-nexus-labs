import { useState, useEffect, useCallback } from "react";
import { TypingSettings } from "./TypingSettings";
import { TypingDisplay } from "./TypingDisplay";
import { TypingResults } from "./TypingResults";
import { generateWords } from "@/lib/wordGenerator";

export type TypingMode = "normal" | "left-hand" | "right-hand";
export type TestType = "time" | "words";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  correctChars: number;
}

export interface TestSettings {
  mode: TypingMode;
  testType: TestType;
  duration: number;
  wordCount: number;
}

export const TypingPractice = () => {
  const [settings, setSettings] = useState<TestSettings>({
    mode: "normal",
    testType: "time",
    duration: 30,
    wordCount: 50,
  });
  
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const initializeTest = useCallback(() => {
    const newWords = generateWords(settings.mode, settings.testType === "words" ? settings.wordCount : 200);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setWordsTyped(0);
    setErrors(0);
    setCorrectChars(0);
    setTotalChars(0);
    setTimeLeft(settings.duration);
    setShowResults(false);
    setStartTime(null);
  }, [settings]);

  const startTest = () => {
    setIsTestActive(true);
    setStartTime(Date.now());
  };

  const endTest = useCallback(() => {
    setIsTestActive(false);
    setShowResults(true);
  }, []);

  const handleInput = (input: string) => {
    if (!isTestActive && input.length > 0) {
      startTest();
    }

    setCurrentInput(input);

    if (input.endsWith(" ") && input.trim().length > 0) {
      const typedWord = input.trim();
      const currentWord = words[currentWordIndex];
      
      setTotalChars(prev => prev + typedWord.length);
      
      if (typedWord === currentWord) {
        setCorrectChars(prev => prev + typedWord.length);
        setWordsTyped(prev => prev + 1);
      } else {
        setErrors(prev => prev + 1);
        const correctCount = Math.min(typedWord.length, currentWord.length);
        for (let i = 0; i < correctCount; i++) {
          if (typedWord[i] === currentWord[i]) {
            setCorrectChars(prev => prev + 1);
          }
        }
      }

      setCurrentInput("");
      setCurrentWordIndex(prev => prev + 1);

      // Check if test should end (word count mode)
      if (settings.testType === "words" && wordsTyped + 1 >= settings.wordCount) {
        endTest();
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTestActive && settings.testType === "time") {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, settings.testType, endTest]);

  // Initialize test when settings change
  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  const calculateWPM = () => {
    if (!startTime || !isTestActive && timeLeft === settings.duration) return 0;
    const timeElapsed = isTestActive 
      ? (Date.now() - startTime) / 1000 / 60 
      : (settings.duration - timeLeft) / 60;
    return Math.round((correctChars / 5) / Math.max(timeElapsed, 1/60));
  };

  const calculateAccuracy = () => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  };

  const stats: TypingStats = {
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    errors,
    totalChars,
    correctChars,
  };

  const resetTest = () => {
    setIsTestActive(false);
    initializeTest();
  };

  if (showResults) {
    return (
      <TypingResults 
        stats={stats}
        onRestart={resetTest}
        settings={settings}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <TypingSettings
        settings={settings}
        onSettingsChange={setSettings}
        onReset={resetTest}
        isTestActive={isTestActive}
      />
      
      <TypingDisplay
        words={words}
        currentWordIndex={currentWordIndex}
        currentInput={currentInput}
        onInputChange={handleInput}
        isTestActive={isTestActive}
        timeLeft={timeLeft}
        wordsTyped={wordsTyped}
        stats={stats}
        settings={settings}
      />
    </div>
  );
};