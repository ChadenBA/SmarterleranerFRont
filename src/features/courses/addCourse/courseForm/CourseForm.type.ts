import { UseFormReturn } from 'react-hook-form';
import { Quiz } from 'types/models/Quiz';

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseFormValues, undefined>;
  defaultValues?: CourseFormValues;
  isEditMode?: boolean;
}

export interface CourseFormValues {
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  subscribers?: number[];
  quiz: Quiz;
  courseMedia?: File;
}
