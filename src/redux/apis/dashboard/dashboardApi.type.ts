export interface StudentDashboardApi {
  data: {
    enrolled_courses: number;
  };
}

export interface AdminDashboardApi {
  data: {
    users: number;
    courses: number;
    categories: number;
    subscribers: number;
    subscribers_per_course_category: {
      category: string;
      subscribers: number;
    }[];
  };
}
