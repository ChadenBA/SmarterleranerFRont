export const PATHS = {
  ROOT: '/',

  CATEGORIES: {
    ROOT: '/categories',
  },

  ABOUT_US: '/AboutUs',
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGET_PASSWORD: 'forget-password',
    SET_PASSWORD: 'password-set',
  },

  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: {
      ROOT: '/dashboard/profile',
      SETTINGS: '/dashboard/profile/settings',
    },
    ADMIN: {
      ROOT: '/dashboard/admin',
      USERS: {
        ROOT: '/dashboard/admin/users',
        ALL: '/dashboard/admin/users/all',
        PENDING: '/dashboard/admin/users/pending',
        ACCEPTED: '/dashboard/admin/users/accepted',
        EDIT_USER: '/dashboard/admin/users/:userId',
        ADD_USER: '/dashboard/admin/addUser',
      },
      CATEGORY: {
        ROOT: '/dashboard/admin/categories',
        ADD_CATEGORY: '/dashboard/admin/categories/add-category',
        EDIT_CATEGORY: '/dashboard/admin/categories/:categoryId',
      },
      COURSES : {
        ROOT: '/dashboard/admin/courses',
        ADD_COURSE: '/dashboard/admin/courses/add-course',
        EDIT_COURSE: '/dashboard/admin/courses/:course',
      }
    },
    STUDENT: {
      ROOT: '/dashboard/student',
      MY_PROGRAM: {
        ROOT: '/dashboard/student/my-program',
        COMPLETED_COURSES: '/dashboard/student/my-program/completed-courses',
      },
      MY_QUIZZES: '/dashboard/student/my-quizzes',
      MY_SUPPORT: '/dashboard/student/my-support',
    },

  },

  MAIN: {
    HOME: '',
    ERROR: {
      P_500: '/500',
      P_404: '/404',
      P_403: '/403',
    },
  },
  ANY: '*',
}
