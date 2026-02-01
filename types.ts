
export enum GameMode {
  HOME = 'HOME',
  MEMORY = 'MEMORY',
  MATH = 'MATH',
  FRUIT_CATCHER = 'FRUIT_CATCHER',
  GEMINI_OWL = 'GEMINI_OWL'
}

export interface MemoryCard {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MathQuestion {
  question: string;
  answer: number;
  options: number[];
}
