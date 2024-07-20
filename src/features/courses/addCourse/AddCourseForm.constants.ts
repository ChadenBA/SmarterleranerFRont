import { Section } from './sectionForm/module/Module.type';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
//import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { CourseFormValues } from './courseForm/CourseForm.type';
import { Step } from '@components/CustomStepper/CustomStepper.type';

export const STEPS: Step[] = [
  {
    label: 'course.create_course',
    icon: null,
  },
  {
    label: 'course.create_section',
    icon: null,
  },
];
export const DEFAULT_SECTIONS: Section[] = [
  {
    title: GLOBAL_VARIABLES.EMPTY_STRING,
    description: GLOBAL_VARIABLES.EMPTY_STRING,
    duration: GLOBAL_VARIABLES.EMPTY_STRING,
    hasQuiz: 0,
    externalUrls: [
      {
        id: 0,
        url: GLOBAL_VARIABLES.EMPTY_STRING,
        title: GLOBAL_VARIABLES.EMPTY_STRING,
      },
    ],
    quiz: {
      questions: [
        {
          question: GLOBAL_VARIABLES.EMPTY_STRING,
          type: QuestionTypeEnum.BINARY,
          isValid: 0,
          answers: [
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
          ],
        },
      ],
    },
  },
];

export const DEFAULT_COURSE: CourseFormValues = {
  title: GLOBAL_VARIABLES.EMPTY_STRING,
  description: GLOBAL_VARIABLES.EMPTY_STRING,
  category: 0,
  subCategory: 0,
  courseMedia: {
    id: 0,
    modelId: 0,
    fileName: GLOBAL_VARIABLES.EMPTY_STRING,
    title: GLOBAL_VARIABLES.EMPTY_STRING,
    mimeType: GLOBAL_VARIABLES.EMPTY_STRING,
  },
  // TODO: educationalUnites: DEFAULT_EU,
  quiz: {
    questions: [
      {
        question: GLOBAL_VARIABLES.EMPTY_STRING,
        type: QuestionTypeEnum.BINARY,
        isValid: 0,
        answers: [
          {
            answer: GLOBAL_VARIABLES.EMPTY_STRING,
            isValid: 0,
          },
          {
            answer: GLOBAL_VARIABLES.EMPTY_STRING,
            isValid: 0,
          },
        ],
      },
    ],
  },
};
