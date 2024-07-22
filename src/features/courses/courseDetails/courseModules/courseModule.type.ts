import { Section } from '@features/courses/addCourse/sectionForm/module/Eu.type';
import { Quiz } from 'types/models/Quiz';

export interface CourseModuleProps {
  title: string;
  media: {
    id: number;
    modelId: number;
    fileName: string;
    title: string;
    mimeType: string;
  }[];
  duration: number;
  section: Section;
  quiz?: Quiz;
  isEnrolled?: boolean;
}
