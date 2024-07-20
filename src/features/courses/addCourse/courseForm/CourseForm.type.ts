import { UseFormReturn } from 'react-hook-form';
import { Quiz } from './CourseForm.constants';

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseFormValues, undefined>;
  defaultValues?: CourseFormValues;
  isEditMode?: boolean;
}

export interface CourseFormValues {
  title: string;
  description: string;
  category: number;
  subCategory: number;
  courseMedia: File;
  quiz: Quiz;
}
