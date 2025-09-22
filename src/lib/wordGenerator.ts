import { TypingMode } from "@/components/TypingPractice";

// Word lists for different hand positions
const leftHandWords = [
  "test", "best", "rest", "west", "fest", "cast", "fast", "vast", "last", "past",
  "cats", "bats", "rats", "fats", "acts", "beds", "reds", "weds", "feds", "sect",
  "desert", "assert", "attest", "stress", "assess", "access", "excess", "recess",
  "defect", "effect", "affect", "detect", "select", "reject", "expect", "aspect",
  "create", "debate", "estate", "rebate", "sedate", "locate", "rotate", "update"
];

const rightHandWords = [
  "you", "your", "look", "mind", "join", "lion", "moon", "noon", "loop", "pool",
  "pull", "push", "pump", "jump", "lump", "dump", "hump", "bump", "limp", "pimp",
  "milk", "silk", "hulk", "bulk", "punk", "junk", "link", "pink", "kilo", "polo",
  "plus", "plug", "plum", "plot", "play", "plan", "pill", "pull", "pony", "only",
  "holy", "july", "oily", "lily", "join", "john", "junk", "jump", "lump", "hymn"
];

const normalWords = [
  "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her", "was", "one",
  "our", "out", "day", "get", "has", "him", "his", "how", "its", "may", "new", "now", "old",
  "see", "two", "way", "who", "boy", "did", "man", "car", "she", "use", "her", "many", "then",
  "them", "well", "were", "been", "have", "their", "said", "each", "which", "do", "how", "if",
  "will", "up", "other", "about", "out", "many", "time", "very", "when", "much", "before",
  "through", "back", "years", "where", "much", "your", "work", "life", "only", "over", "think",
  "also", "its", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "because", "any", "these", "give", "day", "most", "us", "is", "water", "long",
  "find", "here", "thing", "great", "every", "move", "just", "form", "sentence", "man", "think",
  "say", "great", "where", "help", "through", "much", "before", "line", "right", "too", "mean",
  "old", "any", "same", "tell", "boy", "follow", "came", "want", "show", "also", "around", "farm",
  "three", "small", "set", "put", "end", "why", "again", "turn", "here", "off", "went", "old",
  "number", "no", "way", "could", "people", "my", "than", "first", "water", "been", "call", "who",
  "oil", "sit", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part"
];

function getWordsForMode(mode: TypingMode): string[] {
  switch (mode) {
    case "left-hand":
      return leftHandWords;
    case "right-hand":
      return rightHandWords;
    default:
      return normalWords;
  }
}

export function generateWords(mode: TypingMode, count: number): string[] {
  const wordList = getWordsForMode(mode);
  const words: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  
  return words;
}