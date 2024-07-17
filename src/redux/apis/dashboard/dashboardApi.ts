import { ENDPOINTS } from '@config/constants/endpoints'
import { MethodsEnum } from '@config/enums/method.enum'
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig'
import { createApi } from '@reduxjs/toolkit/query/react'
import {
  AdminDashboard,
  DesignerDashboard,
  FacilitatorDashboard,
  GuestStatistics,
  StudentDashboard,
} from 'types/models/Dashboard'
import {
  AdminDashboardApi,
  DesignerDashboardApi,
  FacilitatorDashboardApi,
  GuestStatisticsApi,
  StudentDashboardApi,
} from './dashboardApi.type'
import {
  transformAdminDashboard,
  transformDesignerDashboard,
  transformFacilitatorDashboard,
  transformGuestStatistics,
  transformStudentDashboard,
} from './dashboardApi.transform'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryConfigWithRefresh,
  endpoints: (builder) => ({
    getStudentStatistics: builder.query<StudentDashboard, void>({
      query: () => ({
        url: ENDPOINTS.STUDENT_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: StudentDashboardApi) =>
        transformStudentDashboard(response),
    }),
    getAdminStatistics: builder.query<AdminDashboard, void>({
      query: () => ({
        url: ENDPOINTS.ADMIN_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: AdminDashboardApi) =>
        transformAdminDashboard(response),
    }),
    getFacilitatorStatistics: builder.query<FacilitatorDashboard, void>({
      query: () => ({
        url: ENDPOINTS.FACILITATOR_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: FacilitatorDashboardApi) =>
        transformFacilitatorDashboard(response),
    }),
    getDesignerStatistics: builder.query<DesignerDashboard, void>({
      query: () => ({
        url: ENDPOINTS.DESIGNER_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: DesignerDashboardApi) =>
        transformDesignerDashboard(response),
    }),
    getGuestStatistics: builder.query<GuestStatistics, void>({
      query: () => ({
        url: ENDPOINTS.GUEST_STATISTICS,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: GuestStatisticsApi) =>
        transformGuestStatistics(response),
    }),
  }),
})

export const {
  useGetStudentStatisticsQuery,
  useGetAdminStatisticsQuery,
  useGetFacilitatorStatisticsQuery,
  useGetDesignerStatisticsQuery,
  useGetGuestStatisticsQuery,
} = dashboardApi
