import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
// import {
//   TeachingTypeEnum,
//   TeachingTypeFilterEnum,
// } from '@config/enums/teachingType.enum'
import { InputConfig, InputOption } from 'types/interfaces/InputConfig';

export const BOOLEAN_OPTIONS: InputOption[] = [
  //   { label: 'common.yes', value: 1 },
  //   { label: 'common.no', value: 0 },
  // ]
  // const TEACHING_TYPE_OPTIONS = [
  //   { label: TeachingTypeEnum.NO_TYPE, value: TeachingTypeFilterEnum.NO_TYPE },
  //   { label: TeachingTypeEnum.ONLINE, value: TeachingTypeFilterEnum.ONLINE },
  //   {
  //     label: TeachingTypeEnum.ON_A_PLACE,
  //     value: TeachingTypeFilterEnum.ON_A_PLACE,
  //   },
];

export const CREATE_COURSE_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: 'course.title_placeholder',
    label: 'course.title',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.title_required' },
  },
  description: {
    name: 'description',
    placeholder: 'course.description_placeholder',
    label: 'course.description',
    type: 'textarea',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.description_required' },
  },
  category: {
    name: 'category',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.category_label',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'category.category_required',
    },
  },
  subCategory: {
    name: 'subCategory',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.sub_category_label',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'category.sub_category_required',
    },
  },
};

// !! This is a sample data structure for the quiz section of the course form DANGER !! CHANGE IT TO PROPER LOCATION

export enum QuestionTypeEnum {
  QCM = 1,
  OPEN = 2,
  BINARY = 3,
}

export enum QuestionTypeLabelEnum {
  QCM = 'QCM',
  OPEN = 'OPEN',
  BINARY = 'BINARY',
}

export interface Answer {
  id?: number;
  answer: string;
  isValid: 0 | 1;
}

export interface Question {
  id?: number;
  question: string;
  type: QuestionTypeEnum;
  isValid: 0 | 1;
  answers: Answer[];
}
export interface Quiz {
  id?: number;
  questions: Question[];
  timeLeft?: number;
}

export interface Section {
  databaseId?: number;
  title: string;
  description: string;
  duration: string;
  hasQuiz: 1 | 0;
  quiz: Quiz;
  externalUrls?: {
    id: number;
    url: string;
    title: string;
  }[];
  media?: {
    id: number;
    modelId: number;
    fileName: string;
    title: string;
    mimeType: string;
  }[];
}
export const DEFAULT_MODULE_OBJECT: Section = {
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
};

export const DEFAULT_QUESTION_OBJECT: Question = {
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
};

export const DEFAULT_ANSWER_OBJECT: Answer = {
  answer: GLOBAL_VARIABLES.EMPTY_STRING,
  isValid: 0,
};
