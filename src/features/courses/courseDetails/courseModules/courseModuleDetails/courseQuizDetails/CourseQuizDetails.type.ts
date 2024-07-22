import { Section } from '@features/courses/addCourse/sectionForm/module/Eu.type';

export interface CustomQuizDetailsProps {
  open: boolean;
  onClose: () => void;
  section: Section;
}
