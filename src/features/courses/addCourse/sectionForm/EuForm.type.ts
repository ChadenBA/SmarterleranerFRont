import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './module/Eu.type';
import { Dispatch, SetStateAction } from 'react';

export interface EUFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, Record<number, File[]>>>>;
  isFetching?: boolean;
  handleAddEU?: () => void;
  files: Record<number, Record<number, File[]>>;
}
