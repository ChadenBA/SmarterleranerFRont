import { AdminDashboard, StudentDashboard } from 'types/models/Dashboard';
import { AdminDashboardApi, StudentDashboardApi } from './dashboardApi.type';

export const transformStudentDashboard = (data: StudentDashboardApi): StudentDashboard => {
  return {
    enrolledCourses: data.data.enrolled_courses,
  };
};

export const transformAdminDashboard = (data: AdminDashboardApi): AdminDashboard => {
  return {
    users: data.data.users,
    categories: data.data.categories,
    courses: data.data.courses,
    subscribers: data.data.subscribers,
    subscribersPerCourseCategory: data.data.subscribers_per_course_category,
  };
};
