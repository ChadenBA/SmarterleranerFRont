export interface CourseCardProps {
  id: number;
  image: string;
  courseTitle: string;
  isActive?: 0 | 1;
  isOffline?: 0 | 1;
  educationaUnitsCount?: number;
  learningObjectsCount?: number;
  createdAt: string;
  isAdmin?: boolean;
  width?: string;
  isEnrolled?: 0 | 1;
  navigateToEditCoursePage?: (id: number) => void;
}
