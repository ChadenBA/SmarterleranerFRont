import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { silvermanApi } from '../apis/user/silvermanQuestionsApi'; // Import the RTK Query API service
import { SilvermanQuestion } from 'types/interfaces/SilvermanQuestion';
import { ApiResponse } from 'types/interfaces/SilvermanResultData';

// State Interface
interface SilvermanQuestionsState {
  questions: SilvermanQuestion[];
  responses: string[];
  loading: boolean;
  error: string | null;
  submitted: boolean;
  results: ApiResponse | null;
}

// Initial State
const initialState: SilvermanQuestionsState = {
  questions: [],
  responses: [],
  loading: false,
  error: null,
  submitted: false,
  results: null,
};

// Slice
const silvermanQuestionsSlice = createSlice({
  name: 'silvermanQuestions',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<{ index: number; value: string }>) => {
      state.responses[action.payload.index] = action.payload.value;
    },
    resetSubmission: (state) => {
      state.submitted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(silvermanApi.endpoints.getQuestions.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(silvermanApi.endpoints.getQuestions.matchFulfilled, (state, { payload }) => {
        state.questions = payload;
        state.responses = new Array(payload.length).fill('');
        state.loading = false;
      })
      .addMatcher(silvermanApi.endpoints.getQuestions.matchRejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'An unknown error occurred';
      })
      .addMatcher(silvermanApi.endpoints.submitResponses.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(silvermanApi.endpoints.submitResponses.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.submitted = true;
        state.results = payload;
      })
      .addMatcher(silvermanApi.endpoints.submitResponses.matchRejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'An unknown error occurred';
      })
      .addMatcher(silvermanApi.endpoints.getResult.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(silvermanApi.endpoints.getResult.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.results = payload;
      })
      .addMatcher(silvermanApi.endpoints.getResult.matchRejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'An unknown error occurred';
      });
  },
});

export const { setResponse, resetSubmission } = silvermanQuestionsSlice.actions;
export default silvermanQuestionsSlice.reducer;
