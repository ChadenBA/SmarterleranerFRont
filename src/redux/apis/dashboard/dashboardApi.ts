import { ENDPOINTS } from '@config/constants/endpoints';
import { MethodsEnum } from '@config/enums/method.enum';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AdminDashboardApi, StudentDashboardApi } from './dashboardApi.type';
import { transformAdminDashboard, transformStudentDashboard } from './dashboardApi.transform';
import { AdminDashboard, StudentDashboard } from 'types/models/Dashboard';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryConfigWithRefresh,
  endpoints: (builder) => ({
    getStudentStatistics: builder.query<StudentDashboard, void>({
      query: () => ({
        url: ENDPOINTS.STUDENT_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: StudentDashboardApi) => transformStudentDashboard(response),
    }),
    getAdminStatistics: builder.query<AdminDashboard, void>({
      query: () => ({
        url: ENDPOINTS.ADMIN_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: AdminDashboardApi) => transformAdminDashboard(response),
    }),
  }),
});

export const { useGetStudentStatisticsQuery, useGetAdminStatisticsQuery } = dashboardApi;
