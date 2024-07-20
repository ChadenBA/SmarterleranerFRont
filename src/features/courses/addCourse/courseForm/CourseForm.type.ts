import { UseFormReturn } from 'react-hook-form';
import { CourseForDesigner } from 'types/models/Course';

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseFormValues, any, undefined>;
  isEditMode?: boolean;
  defaultValues?: CourseForDesigner;
}

export interface CourseFormValues {
  title: string;
  description: string;
  categoryId: number;
  subscribers: number[];
  courseMedia?: File;
}
