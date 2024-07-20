import { authApi } from '@redux/apis/auth/authApi';
import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbarSlice';
import themeReducer from './slices/theme';
import { categoriesApi } from './apis/categories/categoriesApi';
import searchQueryReducer from './slices/appSlice';
import { userApi } from './apis/user/usersApi';
import authReducer from './slices/authSlice';
import { dashboardApi } from './apis/dashboard/dashboardApi';

export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      userApi.middleware,
      authApi.middleware,
      dashboardApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
