import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormValues } from './module/Eu.type';

import {
  DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
  DEFAULT_ANSWER_OBJECT,
  DEFAULT_BASIC_EDUCATIONAL_UNIT,
  DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
  DEFAULT_QUESTION_OBJECT,
} from './EuForm.constants';

interface UseSectionFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
}
export default function useEducationalUnitForm({ euFormMethods }: UseSectionFormProps) {
  const { fields, append, remove, update } = useFieldArray({
    control: euFormMethods.control,
    name: 'eu',
  });

  // Add a new educational unit to the form
  const handleAddEducationalUnit = (unitType: 'basic' | 'intermediate' | 'advanced') => {
    const unitDefaults = {
      basic: DEFAULT_BASIC_EDUCATIONAL_UNIT,
      intermediate: DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
      advanced: DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
    };
    append(unitDefaults[unitType]);
  };

  // remove an educational unit from the form
  const handleRemoveEducationalUnit = (index: number) => {
    remove(index);
  };

  // Add a new question to the learning object's quiz
  const handleAddQuestion = (euIndex: number, loIndex: number) => {};

  const handleRemoveQuestion = (euIndex: number, loIndex: number, questionIndex: number) => {};

  // Add an answer to a question within a learning object
  const handleAddAnswer = (euIndex: number, loIndex: number, questionIndex: number) => {};

  // Remove an answer from a question within a learning object's quiz
  const handleRemoveAnswer = (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => {};

  // Remove a quiz from a learning object
  const handleRemoveQuiz = (euIndex: number, loIndex: number) => {};

  return {
    fields,
    handleAddEducationalUnit,
    handleRemoveEducationalUnit,
    handleAddQuestion,
    handleRemoveQuestion,
    handleRemoveAnswer,
    handleAddAnswer,
    handleRemoveQuiz,
  };
}
