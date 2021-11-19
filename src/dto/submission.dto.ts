export interface Answer {
  question: string,
  answer: string,
}

export class Answer {
  question: string

  answer: string
}

export interface Submission {
  isCorrect?: boolean
}
