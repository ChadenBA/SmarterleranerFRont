import { authApi } from './apis/auth/authApi';
import { userApi } from './apis/user/usersApi';
import { categoriesApi } from './apis/categories/categoriesApi';
import { silvermanApi } from './apis/user/silvermanQuestionsApi';
import { configureStore } from '@reduxjs/toolkit';

// Existing imports
import snackbarReducer from './slices/snackbarSlice';
import themeReducer from './slices/theme';
import searchQueryReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import silvermanQuestionsReducer from './slices/silvermanQuestionsSlice';
import uploadReducer from './slices/uploadSlice';
import { dashboardApi } from './apis/dashboard/dashboardApi';
import { courseApi } from './apis/courses/coursesApi';

export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    silvermanQuestions: silvermanQuestionsReducer,
    upload: uploadReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [silvermanApi.reducerPath]: silvermanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      userApi.middleware,
      authApi.middleware,
      dashboardApi.middleware,
      courseApi.middleware,
      silvermanApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
