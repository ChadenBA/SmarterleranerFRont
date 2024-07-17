import {
  AdminDashboard,
  DesignerDashboard,
  FacilitatorDashboard,
  GuestStatistics,
  StudentDashboard,
} from 'types/models/Dashboard'
import {
  AdminDashboardApi,
  DesignerDashboardApi,
  FacilitatorDashboardApi,
  GuestStatisticsApi,
  StudentDashboardApi,
} from './dashboardApi.type'

export const transformStudentDashboard = (
  data: StudentDashboardApi,
): StudentDashboard => {
  return {
    enrolledLearningPaths: data.data.enrolled_learning_paths,
    enrolledCourses: data.data.enrolled_courses,
    completedCourses: data.data.completed_courses,
    completedLearningPaths: data.data.completed_learning_paths,
    certificates: data.data.certificates,
    attestation: data.data.attestations,
    totalPricePerMonth: data.data.total_price_per_month,
  }
}
export const transformGuestStatistics = (
  data: GuestStatisticsApi,
): GuestStatistics => {
  return {
    courses: data.data.courses,
    students: data.data.students,
    instructors: data.data.instructors,
    onlineCourses: data.data.online_courses,
  }
}

export const transformAdminDashboard = (
  data: AdminDashboardApi,
): AdminDashboard => {
  return {
    users: data.data.users,
    courses: data.data.courses,
    learningPaths: data.data.learning_paths,
    categories: data.data.categories,
    languages: data.data.languages,
    income: data.data.income,
    certificates: data.data.certificates,
    attestations: data.data.attestations,
  }
}
export const transformDesignerDashboard = (
  data: DesignerDashboardApi,
): DesignerDashboard => {
  return {
    privateCourses: data.data.private_courses,
    publicCourses: data.data.public_courses,
    privateLearningPaths: data.data.private_learning_paths,
    publicLearningPaths: data.data.public_learning_paths,
    enrolledStudentsInPrivateCourses:
      data.data.enrolled_students_in_private_courses,
    enrolledStudentsInPublicCourses:
      data.data.enrolled_students_in_public_courses,
    enrolledStudentsInPrivateLearningPaths:
      data.data.enrolled_students_in_private_learning_paths,
    enrolledStudentsInPublicLearningPaths:
      data.data.enrolled_students_in_public_learning_paths,
    totalPrice: data.data.total_price,
  }
}

export const transformFacilitatorDashboard = (
  data: FacilitatorDashboardApi,
): FacilitatorDashboard => {
  return {
    privateCourses: data.data.private_courses,
    publicCourses: data.data.public_courses,
    enrolledStudents: data.data.enrolled_students,
    totalFee: data.data.total_fee,
  }
}
