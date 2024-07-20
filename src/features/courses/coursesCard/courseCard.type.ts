export interface CourseCardProps {
  id: number
  image: string
  courseTitle: string
  isActive?: boolean
  isOffline?: boolean
  educationaUnitsCount: number
  learningObjectsCount: number
  createdAt: string
  isAdmin?: boolean
  width?: string
  isEnrolled?: boolean
  navigateToEditCoursePage?: (id: number) => void
}
