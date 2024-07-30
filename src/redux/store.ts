import { authApi } from '@redux/apis/auth/authApi';
import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbarSlice';
import themeReducer from './slices/theme';
import { categoriesApi } from './apis/categories/categoriesApi';
import searchQueryReducer from './slices/appSlice';
import { userApi } from './apis/user/usersApi';
import authReducer from './slices/authSlice';
import { dashboardApi } from './apis/dashboard/dashboardApi';
import { courseApi } from './apis/courses/coursesApi';
import { silvermanApi } from './apis/user/silvermanQuestionsApi';
import silvermanQuestionsReducer from './slices/silvermanQuestionsSlice';
export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    silvermanQuestions: silvermanQuestionsReducer,
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
