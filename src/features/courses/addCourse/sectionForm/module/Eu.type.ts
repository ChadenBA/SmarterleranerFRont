import { Dispatch, SetStateAction } from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { Eu } from 'types/models/Eu';

export interface FormValues {
  eu: Eu[];
}

export interface EuProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
  files: Record<number, File[]>;
  euIndex: number;
  type?: string;
  loIndex: number;
  canDelete: boolean;
  field: FieldArrayWithId<FormValues, 'eu', 'id'>;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>;
  handleAddQuestion: (euIndex: number, loIndex: number) => void;
  handleRemoveQuestion: (euIndex: number, loIndex: number, questionIndex: number) => void;
  handleAddAnswer: (euIndex: number, loIndex: number, questionIndex: number) => void;
  handleRemoveAnswer: (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => void;
  handleRemoveEu: (euIndex: number) => void;
  handleAddEuApi?: () => void;
  handleRemoveQuiz?: (euIndex: number, loIndex: number) => void;
  onAddEu?: () => void;
}
