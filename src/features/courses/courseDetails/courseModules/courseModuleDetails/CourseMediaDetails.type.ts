import { Section } from '@features/courses/addCourse/sectionForm/module/Eu.type';

export interface CourseMediaDetailsProps {
  open: boolean;
  scroll: 'paper' | 'body' | undefined;
  onClose: () => void;
  section: Section;
  isEnrolled?: boolean;
  currentMediaIndex: number;
}
