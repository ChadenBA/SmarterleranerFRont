export interface StudentDashboard {
  enrolledCourses: number;
}

export interface AdminDashboard {
  users: number;
  courses: number;
  categories: number;
  subscribers: number;
  subscribersPerCourseCategory: {
    category: string;
    subscribers: number;
  }[];
}
