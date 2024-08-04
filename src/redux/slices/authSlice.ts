import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';
import { authApi } from '@redux/apis/auth/authApi';
import { courseApi } from '@redux/apis/courses/coursesApi';
import { silvermanApi } from '@redux/apis/user/silvermanQuestionsApi';
import { userApi } from '@redux/apis/user/usersApi';
import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import {
  clearLocalStorage,
  getUserFromLocalStorage,
  setToLocalStorage,
} from '@utils/localStorage/storage';

const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
  media: getUserFromLocalStorage()?.media,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      (state.media = {
        id: 0,
        modelId: 0,
        fileName: GLOBAL_VARIABLES.EMPTY_STRING,
      }),
        clearLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { accessToken, refreshToken, user, media } = payload.data;
        state.user = user;
        state.media = media;
        state.isAuthenticated = true;
        setToLocalStorage(LocalStorageKeysEnum.AccessToken, accessToken);
        setToLocalStorage(LocalStorageKeysEnum.RefreshToken, refreshToken);
        setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify({ ...user, media }));
      })

      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        clearLocalStorage();
      })

      .addMatcher(userApi.endpoints.updateProfile.matchFulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isAuthenticated = true;
        state.media = payload.data.media;
        setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(payload.data));
      })

      .addMatcher(courseApi.endpoints.enrollCourse.matchFulfilled, (state, { payload }) => {
        if (state.user) {
          state.user.coursesCount = payload.data.coursesCount;
          setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(state.user));
        }
      })
      .addMatcher(silvermanApi.endpoints.submitResponses.matchFulfilled, (state, { payload }) => {
        if (state.user) {
          state.user.result = payload.result;
          setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(state.user));
        }
      })
      .addMatcher(courseApi.endpoints.enrollCourse.matchFulfilled, (state, { payload }) => {
        if (state.user) {
          state.user.latestCourseId = payload.data.latestCourseId;
          setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(state.user));
        }
      });
  },
});
export const selectAuth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
