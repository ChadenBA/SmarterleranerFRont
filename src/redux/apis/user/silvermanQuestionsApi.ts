import { createApi } from '@reduxjs/toolkit/query/react';
import { SilvermanQuestion } from 'types/interfaces/SilvermanQuestion';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { ENDPOINTS } from '@config/constants/endpoints';
import { ApiResponse } from 'types/interfaces/SilvermanResultData';
import { MethodsEnum } from '@config/enums/method.enum';

export const silvermanApi = createApi({
  reducerPath: 'silvermanApi',
  baseQuery: baseQueryConfigWithRefresh,
  endpoints: (builder) => ({
    getQuestions: builder.query<SilvermanQuestion[], void>({
      query: () => ({
        url: ENDPOINTS.SILVERMAN_QUESTIONS,
        method: MethodsEnum.GET,
      }),
    }),
    submitResponses: builder.mutation<ApiResponse, { responses: string[]; course_id: number }>({
      query: (payload) => ({
        url: ENDPOINTS.SILVERMAN_SUBMIT_RESPONSES,
        method: MethodsEnum.POST,
        body: { responses: payload.responses, course_id: payload.course_id },
      }),
    }),
    getResult: builder.query<ApiResponse, void>({
      query: () => ({
        url: ENDPOINTS.SILVERMAN_RESULT,
        method: MethodsEnum.GET,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useSubmitResponsesMutation, useGetResultQuery } = silvermanApi;
