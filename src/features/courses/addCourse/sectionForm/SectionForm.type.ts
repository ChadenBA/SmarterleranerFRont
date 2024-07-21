import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './module/Module.type';
import { CourseForAdmin } from 'types/models/Course';

export interface EUFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
  isEditMode?: boolean;
  defaultValues?: CourseForAdmin;
  isFetching?: boolean;
  handleAddEducationUnit?: () => void;
}
