import { transformPaginationResponse } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { Course, CourseForAdmin } from 'types/models/Course';
import { ApiPaginationResponse } from '../type';
import {
  ApiEU,
  ApiLO,
  ApiQuestion,
  CourseApi,
  CourseForAdminApi,
  SingleCourseResponseData,
} from './coursesApi.type';
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers';

import { transformMedia } from '../transform';
import {
  transformDuration,
  transformDateFormat,
  convertToUnixTimestamp,
  convertFromUnixTimestampToDateTime,
} from '@utils/helpers/date.helpers';

import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
import { Question } from 'types/models/Quiz';
import { decodeQuestionType } from '@utils/helpers/course.helpers';
import { ConfigEnv } from '@config/configEnv';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { Eu } from 'types/models/Eu';
import { Lo } from 'types/models/Lo';

export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<CourseApi>,
): PaginationResponse<Course> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformCourses(Object.values(response?.data)),
    };
  }
  return {
    message: response.message,
    data: transformCourses(Object.values(response?.data)),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

export const transformFetchCourseResponse = (
  response: SingleCourseResponseData,
): ItemDetailsResponse<Course> => {
  return {
    message: response.message,
    data: transformSingleCourse(response.data),
  };
};

export const transformCourses = (data: CourseApi[]): Course[] => {
  return data.map((course) => transformSingleCourse(course));
};

export const transformSingleCourse = (course: CourseApi): Course => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    categoryId: course.category_id,
    category: {
      id: course.category.id,
      category: course.category.category,
    },
    subcategoryId: course.subcategory_id,
    subcategory: {
      id: course.subcategory.id,
      subcategory: course.subcategory.subcategory,
    },
    quiz: course.quiz
      ? {
          id: course.quiz.id,
          questions: course.quiz.questions.map((question) => ({
            id: question.id,
            question: question.question,
            type: question.type,
            isValid: question.is_valid,
            answers: question.answers.map((answer) => ({
              id: answer.id,
              answer: answer.answer,
              isValid: answer.is_valid,
            })),
          })),
        }
      : {
          id: 0,
          questions: [
            {
              question: GLOBAL_VARIABLES.EMPTY_STRING,
              type: QuestionTypeEnum.BINARY,
              isValid: 0,
              answers: [],
            },
          ],
        },
    educationalUnits: transformEducationalUnits(course.educational_units),
    isActive: course?.is_active === 1,
    isOffline: course?.is_offline === 1,
    createdAt: transformDateFormat(course.created_at),
    educationalUnitsCount: course.educational_units_count,
    learningObjectsCount: course.learning_objects_count,
    subscribedUsersCount: course.subscribed_users_count,

    media: transformMedia(course.media),
  };
};

export const transformEducationalUnits = (educationalUnits: ApiEU[]): Eu => {
  return educationalUnits.map((eu) => ({
    id: eu.id,
    title: eu.title,
    type: eu.type,
    learningObjects: transformLearningObjects(eu.learning_objects),
  }));
};

export const transformLearningObjects = (learningObjects: ApiLO[]): Lo => {
  return learningObjects.map((lo) => ({
    id: lo.id,
    title: lo.title,
    type: lo.type,
    media: transformMedia(lo.media),
    quiz: lo.quiz
      ? {
          id: lo.quiz.id,
          questions: lo.quiz.questions.map((question) => ({
            id: question.id,
            question: question.question,
            type: question.type,
            isValid: question.is_valid,
            answers: question.answers.map((answer) => ({
              id: answer.id,
              answer: answer.answer,
              isValid: answer.is_valid,
            })),
          })),
        }
      : {
          id: 0,
          questions: [
            {
              question: GLOBAL_VARIABLES.EMPTY_STRING,
              type: QuestionTypeEnum.BINARY,
              isValid: 0,
              answers: [],
            },
          ],
        },
  }));
};

export const transformFetchCourseForAdminResponse = (
  response: ItemDetailsResponse<CourseForAdminApi>,
): ItemDetailsResponse<CourseForAdmin> => {
  const { data } = response;

  return {
    message: response.message,
    data: {
      id: data.id,
      title: data.title,
      description: data.description,
      categoryId: data.category_id,
      isOffline: data.is_offline,
      isActive: data.is_active,
      subscribers: data.subscribers.map((subscriber) => subscriber.id),
      createdAt: convertFromUnixTimestampToDateTime(convertToUnixTimestamp(data.created_at)),
      media: data.media.map((media) => ({
        id: media.id,
        modelId: media.model_id,
        fileName: media.file_name,
        title: GLOBAL_VARIABLES.EMPTY_STRING,
        mimeType: media.mime_type,
      })),
      educationalUnits: data.educational_units.map((eu) => ({
        id: eu.id,
        title: eu.title,
        type: eu.type,
        learningObjects: eu.learning_objects.map((lo) => ({
          id: lo.id,
          title: lo.title,
          type: lo.type,
          media: lo.media.map((media) => ({
            id: media.id,
            modelId: media.model_id,
            fileName: media.file_name,
            title: GLOBAL_VARIABLES.EMPTY_STRING,
            mimeType: media.mime_type,
          })),
          quiz: lo.quiz
            ? {
                id: lo.quiz.id,
                questions: lo.quiz.questions.map((question) => ({
                  id: question.id,
                  question: question.question,
                  type: question.type,
                  isValid: question.is_valid,
                  answers: question.answers.map((answer) => ({
                    id: answer.id,
                    answer: answer.answer,
                    isValid: answer.is_valid,
                  })),
                })),
              }
            : {
                id: 0,
                questions: [
                  {
                    question: GLOBAL_VARIABLES.EMPTY_STRING,
                    type: QuestionTypeEnum.BINARY,
                    isValid: 0,
                    answers: [],
                  },
                ],
              },
        })),
      })),
    },
  };
};

const transformCourseLo = (loApi: ApiLO): Lo => {
  return {
    title: loApi.title,
    type: loApi.type,
    id: loApi.id,
    media: loApi.media
      ? loApi.media.map((media) => ({
          id: media.id,
          fileName: media.file_name,
          mimeType: media.mime_type,
          modelId: media.model_id,
          title: GLOBAL_VARIABLES.EMPTY_STRING,
        }))
      : [],

    quiz:
      loApi?.quiz?.questions?.length > 0
        ? {
            id: loApi.quiz.id,
            questions:
              loApi.quiz.questions.length > 0
                ? loApi.quiz.questions.map((question) => transformQuestionSection(question))
                : [],
          }
        : {
            id: 0,
            questions: [
              {
                question: GLOBAL_VARIABLES.EMPTY_STRING,
                type: QuestionTypeEnum.BINARY,
                isValid: 0,
                answers: [],
              },
            ],
          },
  };
};

export const transformQuestionSection = (questionApi: ApiQuestion): Question => {
  const { id, is_valid, question, type, answers } = questionApi;
  return {
    id: id,
    type: decodeQuestionType(type.toString()),
    question: question,
    isValid: is_valid,
    answers:
      answers.length > 0
        ? answers.map((answer) => ({
            id: answer.id,
            answer: answer.answer,
            isValid: answer.is_valid,
          }))
        : [
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
};

export const decodeSectionsMedia = (sections: ApiLO[]): Record<number, File[]> => {
  let sectionsMedias: Record<number, File[]> = {};

  sections.forEach((step, index) => {
    if (!step.media) return;
    sectionsMedias[index] = step.media.map((media) => {
      const newGeneratedFile = new File(
        [media.file_name],
        `${ConfigEnv.MEDIA_BASE_URL}/${media.file_name}`,
        {
          type: media.mime_type,
        },
      );

      return newGeneratedFile;
    });
  });

  return sectionsMedias;
};
