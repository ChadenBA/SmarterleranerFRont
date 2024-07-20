import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { FormValues } from '../module/Module.type'

export interface QuestionProps {
  field: FieldArrayWithId<FormValues, 'sections', 'id'>
  questionIndex: number
  loIndex?: number

  canDelete: boolean
  loFormMethods: UseFormReturn<FormValues, any, undefined>

  handleDeleteQuestion: (index: number, questionIndex: number) => void
  handleAddQuestion: (index: number) => void
  handleAddAnswer: (index: number, questionIndex: number) => void
  handleRemoveAnswer: (
    index: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
