import { Section } from '@features/courses/addCourse/sectionForm/module/Eu.type';

export interface CourseContentProps {
  steps: Section[];
  isEnrolled?: boolean;
}
