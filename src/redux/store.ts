import { authApi } from '@redux/apis/auth/authApi'
import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import themeReducer from './slices/theme'
import searchQueryReducer from './slices/appSlice'
import authReducer from './slices/authSlice'


export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
