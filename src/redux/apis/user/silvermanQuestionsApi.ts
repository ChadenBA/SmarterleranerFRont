import { createApi } from '@reduxjs/toolkit/query/react';
import { SilvermanQuestion } from 'types/interfaces/SilvermanQuestion';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { ENDPOINTS } from '@config/constants/endpoints';
import { ApiResponse } from 'types/interfaces/SilvermanResultData';

export const silvermanApi = createApi({
  reducerPath: 'silvermanApi',
  baseQuery: baseQueryConfigWithRefresh,
  endpoints: (builder) => ({
    getQuestions: builder.query<SilvermanQuestion[], void>({
      query: () => ({
        url: ENDPOINTS.SILVERMAN_QUESTIONS,
        method: 'GET',
      }),
    }),
    submitResponses: builder.mutation<ApiResponse, { responses: string[] }>({
      query: (payload) => ({
        url: ENDPOINTS.SILVERMAN_SUBMIT_RESPONSES,
        method: 'POST',
        body: { responses: payload.responses },
      }),
    }),
    getResult: builder.query<ApiResponse, void>({
      query: () => ({
        url: ENDPOINTS.SILVERMAN_RESULT,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useSubmitResponsesMutation, useGetResultQuery } = silvermanApi;
