export interface CourseCardProps {
  id?: number;
  image: string;
  courseTitle: string;
  isActive?: 0 | 1;
  isOffline?: 0 | 1;
  educationaUnitsCount?: number;
  learningObjectsCount?: number;
  createdAt: string;
  isAdmin?: boolean;
  width?: string;
  isEnrolled?: boolean;
  navigateToEditCoursePage?: (id: number) => void;
}
