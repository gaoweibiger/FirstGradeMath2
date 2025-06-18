export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number;
  category: string;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
  SHAPE_RECOGNITION = 'shape_recognition'
}

export interface GameState {
  currentLevel: number;
  currentQuestion: number;
  score: number;
  totalQuestions: number;
  questions: Question[];
  answers: (number | null)[];
  isGameComplete: boolean;
  showResult: boolean;
  stars: number;
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  stars: number;
  correctAnswers: number[];
  wrongAnswers: WrongAnswer[];
  completedAt: Date;
}

export interface WrongAnswer {
  question: Question;
  selectedAnswer: number;
  correctAnswer: number;
}

export interface LevelConfig {
  name: string;
  description: string;
  color: string;
  icon: string;
  categories: string[];
}