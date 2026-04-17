export interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ApiResponse {
  results: QuizQuestion[];
}
