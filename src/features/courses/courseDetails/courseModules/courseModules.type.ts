import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

export interface CourseContentProps {
  steps: Section[]
  isEnrolled?: boolean
}
