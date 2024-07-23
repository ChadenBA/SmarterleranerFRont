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
import { toSnakeCase } from '@utils/helpers/string.helpers';

import { transformMedia } from '../transform';
import {
  transformDateFormat,
  convertToUnixTimestamp,
  convertFromUnixTimestampToDateTime,
} from '@utils/helpers/date.helpers';

import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
import { Question, Quiz } from 'types/models/Quiz';
import { decodeQuestionType, getQuestionTypeFilter } from '@utils/helpers/course.helpers';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { Eu } from 'types/models/Eu';
import { Lo } from 'types/models/Lo';
import { FileWithMetadata } from '@components/Inputs/uploadMultipleFiles/UplaodMultipleFiles.type';

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

export const transformEducationalUnit = (eu: ApiEU): Eu => {
  return {
    id: eu.id,
    title: eu.title,
    type: eu.type,
    learningObjects: transformLearningObjects(eu.learning_objects),
  };
};

export const transformEducationalUnits = (educationalUnits: ApiEU[]): Eu[] => {
  return educationalUnits.map((eu) => ({
    id: eu.id,
    title: eu.title,
    type: eu.type,
    learningObjects: transformLearningObjects(eu.learning_objects),
  }));
};

export const transformLearningObjects = (learningObjects: ApiLO[]): Lo[] => {
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
      subcategoryId: data.subcategory_id,
      isOffline: data.is_offline,
      isActive: data.is_active,
      quiz: {
        id: data.quiz.id,
        questions: data.quiz.questions.map((question) => transformQuestionSection(question)),
      },
      subscribers: data.subscribers.map((subscriber) => subscriber.id),
      createdAt: convertFromUnixTimestampToDateTime(convertToUnixTimestamp(data.created_at)),
      courseMedia: new File(
        [data.media[0].file_name],
        data.media[0]?.file_name,

        {
          type: data.media[0].mime_type,
        },
      ),
      educationalUnits: data.educational_units.map((eu) => transformEducationalUnit(eu)),
    },
  };
};

// const transformCourseLo = (loApi: ApiLO): Lo => {
//   return {
//     title: loApi.title,
//     type: loApi.type,
//     id: loApi.id,
//     media: loApi.media
//       ? loApi.media.map((media) => ({
//           id: media.id,
//           fileName: media.file_name,
//           mimeType: media.mime_type,
//           modelId: media.model_id,
//           title: GLOBAL_VARIABLES.EMPTY_STRING,
//         }))
//       : [],

//     quiz:
//       loApi?.quiz?.questions?.length > 0
//         ? {
//             id: loApi.quiz.id,
//             questions:
//               loApi.quiz.questions.length > 0
//                 ? loApi.quiz.questions.map((question) => transformQuestionSection(question))
//                 : [],
//           }
//         : {
//             id: 0,
//             questions: [
//               {
//                 question: GLOBAL_VARIABLES.EMPTY_STRING,
//                 type: QuestionTypeEnum.BINARY,
//                 isValid: 0,
//                 answers: [],
//               },
//             ],
//           },
//   };
// };

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

// export const decodeSectionsMedia = (sections: ApiLO[]): Record<number, File[]> => {
//   let sectionsMedias: Record<number, File[]> = {};

//   sections.forEach((step, index) => {
//     if (!step.media) return;
//     sectionsMedias[index] = step.media.map((media) => {
//       const newGeneratedFile = new File(
//         [media.file_name],
//         `${ConfigEnv.MEDIA_BASE_URL}/${media.file_name}`,
//         {
//           type: media.mime_type,
//         },
//       );

//       return newGeneratedFile;
//     });
//   });

//   return sectionsMedias;
// };

export const encodeCourse = (values: FieldValues): FormData => {
  const formData = new FormData();
  const { quiz, courseMedia } = values;

  Object.keys(values).forEach((key) => {
    if (key !== 'courseMedia' && key !== 'quiz') {
      formData.append(toSnakeCase(key), values[key]);
    }
  });
  if (courseMedia) {
    formData.append('course_media', courseMedia);
  }

  if (quiz?.questions?.length > 0) {
    (quiz as Quiz).questions.forEach((question, questionIndex) => {
      formData.append(`quiz[questions][${questionIndex}][question]`, question.question);
      formData.append(
        `quiz[questions][${questionIndex}][type]`,
        getQuestionTypeFilter(question.type as number),
      );
      if (question.type === QuestionTypeEnum.BINARY) {
        formData.append(`quiz[questions][${questionIndex}][is_valid]`, String(question.isValid));
      }

      if (
        question.type === QuestionTypeEnum.QCM &&
        question.answers &&
        question.answers.length > 0
      ) {
        question.answers.forEach((answer, answerIndex) => {
          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][answer]`,
            answer.answer,
          );
          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
            String(answer.isValid ? '1' : '0'),
          );
        });
      }
    });
  }

  return formData;
};

export const encodeEu = (
  eu: Eu[],
  files: Record<number, Record<number, FileWithMetadata[]>>,
): FormData => {
  const formData = new FormData();
  eu.forEach((unit, euIndex) => {
    formData.append(`eu[${euIndex}][title]`, unit.title);
    formData.append(`eu[${euIndex}][type]`, unit.type);

    unit.learningObjects.forEach((lo, loIndex) => {
      formData.append(`eu[${euIndex}][learningObjects][${loIndex}][title]`, lo.title);
      formData.append(`eu[${euIndex}][learningObjects][${loIndex}][type]`, lo.type);

      if (lo.quiz.questions.length > 0) {
        lo.quiz.questions.forEach((question, questionIndex) => {
          formData.append(
            `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][question]`,
            question.question,
          );

          formData.append(
            `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][type]`,
            getQuestionTypeFilter(question.type as number),
          );

          if (Number(question.type) === QuestionTypeEnum.BINARY) {
            formData.append(
              `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][is_valid]`,
              String(question.isValid),
            );
          }

          if (question.answers.length > 0 && question.type === QuestionTypeEnum.QCM) {
            question.answers.forEach((answer, answerIndex) => {
              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][answers][${answerIndex}][answer]`,
                answer.answer,
              );
              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
                String(answer.isValid ? '1' : '0'),
              );
            });
          }
        });
      }

      if (files[euIndex] && files[euIndex][loIndex]) {
        files[euIndex][loIndex].forEach((file, fileIndex) => {
          if (!file['metadata']['isSupplementary'])
            formData.append(
              `eu[${euIndex}][learningObjects][${loIndex}][media_files][${fileIndex}]`,
              file['file'],
            );
          else
            formData.append(
              `eu[${euIndex}][learningObjects][${loIndex}][supplementary_files][${fileIndex}]`,
              file['file'],
            );
        });
      }
    });
  });

  return formData;
};
