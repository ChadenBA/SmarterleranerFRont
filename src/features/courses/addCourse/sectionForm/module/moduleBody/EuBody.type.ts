import { Dispatch, SetStateAction } from 'react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { FormValues } from '../Eu.type';
import { Question } from 'types/models/Quiz';

export interface EuBodyProps {
  expanded: boolean;
  questions: Question[];
  euIndex: number;
  loIndex: number;
  files: Record<number, File[]>;
  isEditMode?: boolean;
  field: FieldArrayWithId<FormValues, 'eu', 'id'>;
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>;

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
  setDeletedMedia: Dispatch<SetStateAction<string[]>>;
  handleRemoveEu: (euIndex: number) => void;
  handleAddLearningObject: (euIndex: number) => void;
}
