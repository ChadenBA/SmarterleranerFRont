import { CourseForAdmin } from 'types/models/Course';

export interface CoursesListProps {
  courses?: CourseForAdmin[];
  isLoading: boolean;
}
