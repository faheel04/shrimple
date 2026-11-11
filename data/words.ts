import wordData from "./word-data.json";

interface WordData {
  validWords: string[];
  startingWords: string[];
}

const data = wordData as WordData;

export const TARGET_WORD = "SHRIMP";
export const WORD_LENGTH = 6;

export const VALID_WORDS = new Set<string>(data.validWords);
export const STARTING_WORDS: string[] = data.startingWords;