import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormValues } from './module/Eu.type';

import {
  DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
  DEFAULT_ANSWER_OBJECT,
  DEFAULT_BASIC_EDUCATIONAL_UNIT,
  DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
  DEFAULT_QUESTION_OBJECT,
} from './EuForm.constants';
import { Eu } from 'types/models/Eu';
import { v4 as uuidv4 } from 'uuid';

interface UseSectionFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
}
export default function useEducationalUnitForm({ euFormMethods }: UseSectionFormProps) {
  const { fields, insert, remove, update } = useFieldArray({
    control: euFormMethods.control,
    name: 'eu',
  });

  // Add a new educational unit to the form
  const handleAddEducationalUnit = (
    unitType: 'basic' | 'intermediate' | 'advanced',
    index: number,
  ) => {
    const unitDefaults: { [key: string]: Eu } = {
      basic: DEFAULT_BASIC_EDUCATIONAL_UNIT,
      intermediate: DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
      advanced: DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
    };

    insert(index + 1, unitDefaults[(unitType as string).toLocaleLowerCase()]);
  };

  // remove an educational unit from the form
  const handleRemoveEducationalUnit = (index: number) => {
    console.log('fiedddld', index);
    remove(index);
  };

  // Add a new question to the learning object's quiz
  const handleAddQuestion = (euIndex: number, loIndex: number) => {
    const questionDefaults = DEFAULT_QUESTION_OBJECT;
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: [...lo.quiz.questions, { ...questionDefaults, id: uuidv4() }],
              },
            }
          : lo,
      ),
    });
  };

  const handleRemoveQuestion = (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    id: string,
  ) => {
    console.log(euIndex, loIndex, questionIndex, fields);
    console.log('111111111111111111', fields[euIndex].learningObjects[0]);
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.filter((q) => q.id !== id),
              },
            }
          : lo,
      ),
    });

    console.log('22222222222222', fields[euIndex].learningObjects[0]);
  };

  // const handleRemoveQuestion = (euIndex: number, loIndex: number, questionIndex: number) => {
  //   console.log(euIndex, loIndex, questionIndex, fields);
  //   update(euIndex, {
  //     ...fields[euIndex],
  //     learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
  //       index === loIndex
  //         ? {
  //             ...lo,
  //             quiz: {
  //               ...lo.quiz,
  //               questions: lo.quiz.questions.filter((q, i) => {
  //                 const isRemoved = i !== questionIndex;
  //                 console.log(i, questionIndex, isRemoved, q);
  //                 return i !== questionIndex;
  //               }),
  //             },
  //           }
  //         : lo,
  //     ),
  //   });
  // };

  // Add an answer to a question within a learning object
  const handleAddAnswer = (euIndex: number, loIndex: number, questionIndex: number) => {
    const answerDefaults = DEFAULT_ANSWER_OBJECT;
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.map((question, qIndex) =>
                  qIndex === questionIndex
                    ? {
                        ...question,
                        answers: [...question.answers, answerDefaults],
                      }
                    : question,
                ),
              },
            }
          : lo,
      ),
    });
  };

  // Remove an answer from a question within a learning object's quiz
  const handleRemoveAnswer = (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => {
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.map((question, qIndex) =>
                  qIndex === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.filter((_, i) => i !== answerIndex),
                      }
                    : question,
                ),
              },
            }
          : lo,
      ),
    });
  };

  // Remove a quiz from a learning object
  const handleRemoveQuiz = (euIndex: number, loIndex: number) => {};

  const handleAddLearningObject = (euIndex: number) => {
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: [
        ...fields[euIndex].learningObjects,
        {
          title: '',
          type: 'abstract',
          quiz: {
            questions: [
              {
                question: '',
                type: 'binary',
                isValid: 0,
                answers: [
                  {
                    answer: '',
                    isValid: 0,
                  },
                  {
                    answer: '',
                    isValid: 0,
                  },
                ],
              },
            ],
          },
          id: 0,
        },
      ],
    });
  };

  return {
    fields,
    handleAddEducationalUnit,
    handleRemoveEducationalUnit,
    handleAddQuestion,
    handleRemoveQuestion,
    handleRemoveAnswer,
    handleAddAnswer,
    handleRemoveQuiz,
    handleAddLearningObject,
  };
}
