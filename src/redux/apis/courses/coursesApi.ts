import { createApi } from '@reduxjs/toolkit/query/react';

import { PaginationResponse } from 'types/interfaces/Pagination';
import {
  CourseApi,
  CreateCourseResponse,
  SingleCourseResponseData,
  StudentQuiz,
  StudentQuizApi,
} from './coursesApi.type';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { CourseForAdmin } from 'types/models/Course';
import { QueryParams } from 'types/interfaces/QueryParams';
import { MethodsEnum } from '@config/enums/method.enum';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { ENDPOINTS } from '@config/constants/endpoints';
import { ApiPaginationResponse } from '../type';
import {
  encodeCourse,
  encodeEu,
  encodeQuizSubmission,
  transformFetchCourseResponse,
  transformFetchCoursesResponse,
  transformQuizScoreResponse,
  transformQuizSubmissionResponse,
} from './coursesApi.transform';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
import { Eu, QuizSubmission, QuizSubmissionApi } from 'types/models/Eu';
import { FileWithMetadata } from '@components/Inputs/uploadMultipleFiles/UplaodMultipleFiles.type';
import { Progress, setUploadProgress } from '../../slices/uploadSlice';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { getFromLocalStorage, setToLocalStorage } from '@utils/localStorage/storage';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';
import { ConfigEnv } from '@config/configEnv';
import { v4 as uuidv4 } from 'uuid';

interface UploadFileArgs {
  file: File;
  url?: string;
  isSupplementary?: boolean;
  euIndex?: number;
  loIndex?: number;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Courses', 'CoursesForAdmin', 'Course'],
  endpoints: (builder) => ({
    getAdminCourses: builder.query<PaginationResponse<CourseForAdmin>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.ADMIN_COURSES, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
      providesTags: ['Courses'],
    }),

    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: ENDPOINTS.DELETE_COURSE + `/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Courses'],
    }),

    createCourse: builder.mutation<CreateCourseResponse, FieldValues>({
      query: (course) => ({
        url: ENDPOINTS.CREATE_COURSE,
        method: MethodsEnum.POST,
        body: encodeCourse(course),
      }),
      invalidatesTags: ['Courses'],
    }),

    createEu: builder.mutation<
      void,
      { id: number; eu: Eu[]; files: Record<number, Record<number, FileWithMetadata[]>> }
    >({
      query: ({ id, eu, files }) => ({
        url: ENDPOINTS.CREATE_EDUCATIONAL_UNIT + `/${id}`,
        method: MethodsEnum.POST,
        body: encodeEu(eu, files),
      }),
      invalidatesTags: ['Courses'],
    }),

    updateCourse: builder.mutation<CreateCourseResponse, { id: number; course: FieldValues }>({
      query: ({ id, course }) => ({
        url: ENDPOINTS.UPDATE_COURSE + `/${id}`,
        method: MethodsEnum.POST,
        body: encodeCourse(course),
      }),
      invalidatesTags: ['Courses', 'Course'],
    }),

    updateEu: builder.mutation<
      void,
      {
        euId: number;
        deletedMedia: string[];
        files: Record<number, Record<number, FileWithMetadata[]>>;
        euData: FieldValues;
        courseId: string | undefined;
      }
    >({
      query: ({ euId, euData, deletedMedia, files, courseId }) => ({
        url: ENDPOINTS.UPDATE_EU + `/${courseId}/${euId}`,
        method: MethodsEnum.POST,
        body: encodeEu([euData] as Eu[], files, deletedMedia),
      }),
      invalidatesTags: ['Courses', 'Course'],
    }),

    getCourseById: builder.query<ItemDetailsResponse<CourseForAdmin>, string>({
      query: (id) => ({
        url: ENDPOINTS.COURSES + `/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleCourseResponseData) =>
        transformFetchCourseResponse(response),
      providesTags: ['CoursesForAdmin'],
    }),

    getAdminCourseById: builder.query<ItemDetailsResponse<CourseForAdmin>, string>({
      query: (id) => ({
        url: ENDPOINTS.ADMIN_COURSES + `/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleCourseResponseData) =>
        transformFetchCourseResponse(response),
      providesTags: ['CoursesForAdmin'],
    }),

    putCourseActive: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ACTIVE_COURSE}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Courses', 'Course', 'CoursesForAdmin'],
    }),

    setCourseOffline: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.OFFLINE_COURSE}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Courses', 'Course', 'CoursesForAdmin'],
    }),

    setCourseOnline: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.ONLINE_COURSE}/${id}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Courses', 'Course', 'CoursesForAdmin'],
    }),

    getCoursesBySubcategory: builder.query<
      PaginationResponse<CourseForAdmin>,
      { params: QueryParams; subcategoryId: number }
    >({
      query: ({ params, subcategoryId }) => ({
        url: injectPaginationParamsToUrl(`${ENDPOINTS.USER_COURSES}/${subcategoryId}`, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
      providesTags: ['Courses'],
    }),

    enrollCourse: builder.mutation<void, number>({
      query: (courseId) => ({
        url: `${ENDPOINTS.ENROLL_COURSE}/${courseId}`,
        method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Courses', 'Course'],
    }),

    submitQuiz: builder.mutation<
      ItemDetailsResponse<QuizSubmission>,
      { quizId: number | undefined; data: FieldValues }
    >({
      query: ({ quizId, data }) => ({
        url: `${ENDPOINTS.SUBMIT_QUIZ}/${quizId}`,
        method: MethodsEnum.POST,
        body: encodeQuizSubmission(data),
      }),
      transformResponse: (response: ItemDetailsResponse<QuizSubmissionApi>) =>
        transformQuizSubmissionResponse(response),
      invalidatesTags: ['Courses'],
    }),

    getQuizzesScore: builder.query<PaginationResponse<StudentQuiz>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.INDEX_QUIZZES_SCORE, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<StudentQuizApi>) =>
        transformQuizScoreResponse(response),
    }),
    getEnrolledCourses: builder.query<PaginationResponse<CourseForAdmin>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.ENROLLED_COURSES, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
      providesTags: ['Courses'],
    }),

    getCourses: builder.query<PaginationResponse<CourseForAdmin>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.COURSES, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<CourseApi>) =>
        transformFetchCoursesResponse(response),
      providesTags: ['Courses'],
    }),

    uploadFile: builder.mutation<void, UploadFileArgs>({
      queryFn: async (
        {
          file,
          url = ConfigEnv.API_ENDPOINT + ENDPOINTS.MEDIA_UPLOAD_FILE,
          isSupplementary = false,
          euIndex,
          loIndex,
        },
        { dispatch },
      ) => {
        const data = new FormData();
        const temporaryId = uuidv4();

        const dataToPush = {
          temporaryId: temporaryId,
          euIndex: euIndex,
          loIndex: loIndex,
        };

        const currentTemporaryIds =
          getFromLocalStorage(LocalStorageKeysEnum.TemporaryIds, true) ?? [];

        currentTemporaryIds.push(dataToPush);
        setToLocalStorage(LocalStorageKeysEnum.TemporaryIds, currentTemporaryIds, true);

        data.append('file', file);
        data.append('temporary_id', temporaryId);
        data.append('is_supplementary', isSupplementary ? 'true' : 'false');

        const config: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${getFromLocalStorage(LocalStorageKeysEnum.RefreshToken)}`,
          },

          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const progress = {
              progress: Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1)),
              id: file.name + '-' + file.size + '-' + file.lastModified,
            };
            dispatch(setUploadProgress(progress));
          },
        };
        try {
          const response = await axios.post(url, data, config);
          return { data: response.data };
        } catch (error: any) {
          return {
            error: {
              status: error.response?.status,
              data: error.message || 'An error occurred',
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetAdminCoursesQuery,
  useDeleteCourseMutation,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useCreateEuMutation,
  usePutCourseActiveMutation,
  useSetCourseOfflineMutation,
  useSetCourseOnlineMutation,
  useGetCoursesBySubcategoryQuery,
  useEnrollCourseMutation,

  useGetAdminCourseByIdQuery,
  useSubmitQuizMutation,
  useGetQuizzesScoreQuery,
  useUpdateEuMutation,
  useGetEnrolledCoursesQuery,
  useGetCoursesQuery,
  useUploadFileMutation,
} = courseApi;
