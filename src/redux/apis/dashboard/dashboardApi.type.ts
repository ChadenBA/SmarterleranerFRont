export interface StudentDashboardApi {
  data: {
    enrolled_courses: number
    completed_courses: number
    enrolled_learning_paths: number
    completed_learning_paths: number
    certificates: number
    attestations: number
    total_price_per_month: {
      [key: string]: number
    }
  }
}

export interface FacilitatorDashboardApi {
  data: {
    private_courses: number
    public_courses: number
    enrolled_students: number
    total_fee: number
  }
}

export interface AdminDashboardApi {
  data: {
    users: number
    courses: number
    learning_paths: number
    categories: number
    languages: number
    income: number
    certificates: number
    attestations: number
  }
}

export interface DesignerDashboardApi {
  data: {
    private_courses: number
    public_courses: number
    private_learning_paths: number
    public_learning_paths: number
    enrolled_students_in_private_courses: number
    enrolled_students_in_public_courses: number
    enrolled_students_in_private_learning_paths: number
    enrolled_students_in_public_learning_paths: number
    total_price: number
  }
}

export interface GuestStatisticsApi {
  data: {
    courses: number
    students: number
    instructors: number
    online_courses: number
  }
}
