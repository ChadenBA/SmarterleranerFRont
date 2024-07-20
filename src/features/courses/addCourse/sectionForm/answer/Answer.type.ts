export interface AnswerProps {
  sectionIndex: number

  questionIndex: number
  answerIndex: number
  canDelete?: boolean
  handleRemoveAnswer: (
    index: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
