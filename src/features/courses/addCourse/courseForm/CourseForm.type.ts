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
  category: number;
  subCategory: number;
  courseMedia: {
    id: number;
    modelId: number;
    fileName: string;
    title: string;
    mimeType: string;
  };
  quiz: Quiz;
}
