import { createApi } from '@reduxjs/toolkit/query/react';

import { PaginationResponse } from 'types/interfaces/Pagination';
import { CourseApi, CourseForAdminApi, CreateCourseResponse } from './coursesApi.type';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { Course, CourseForAdmin } from 'types/models/Course';
import { QueryParams } from 'types/interfaces/QueryParams';
import { MethodsEnum } from '@config/enums/method.enum';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { ENDPOINTS } from '@config/constants/endpoints';
import { ApiPaginationResponse } from '../type';
import {
  encodeCourse,
  transformFetchCourseForAdminResponse,
  transformFetchCoursesResponse,
} from './coursesApi.transform';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Courses', 'CoursesForAdmin', 'Course'],
  endpoints: (builder) => ({
    getAdminCourses: builder.query<PaginationResponse<Course>, QueryParams>({
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

    updateCourse: builder.mutation<CreateCourseResponse, { id: number; course: FieldValues }>({
      query: ({ id, course }) => ({
        url: ENDPOINTS.UPDATE_COURSE + `/${id}`,
        method: MethodsEnum.POST,
        body: encodeCourse(course),
      }),
      invalidatesTags: ['Courses', 'Course'],
    }),
    getCourseForAdminById: builder.query<ItemDetailsResponse<CourseForAdmin>, string>({
      query: (id) => ({
        url: ENDPOINTS.ADMIN_COURSES + `/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ItemDetailsResponse<CourseForAdminApi>) =>
        transformFetchCourseForAdminResponse(response),
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

  }),
});

export const {
  useGetAdminCoursesQuery,
  useDeleteCourseMutation,
  useCreateCourseMutation,
  useGetCourseForAdminByIdQuery,
  useUpdateCourseMutation,

  usePutCourseActiveMutation,
  useSetCourseOfflineMutation,
  useSetCourseOnlineMutation,
} = courseApi;
