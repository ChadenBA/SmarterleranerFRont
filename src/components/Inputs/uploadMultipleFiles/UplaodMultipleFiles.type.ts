import { Dispatch, SetStateAction } from 'react';

export interface IFileState {
  name: string;
  file: File;
  id: string;
}
export interface UploadMultipleFilesProps {
  files: File[];
  euIndex: number;
  loIndex: number;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, Record<number, File[]>>>>;
  setDeletedMedia: Dispatch<SetStateAction<string[]>>;
}
