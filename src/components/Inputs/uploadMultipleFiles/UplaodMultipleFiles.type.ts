import { Dispatch, SetStateAction } from 'react';

export interface UploadMultipleFilesProps {
  files: FileWithMetadata[];
  euIndex: number;
  loIndex: number;
  isSupplementary: boolean;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, Record<number, FileWithMetadata[]>>>>;
  setDeletedMedia: Dispatch<SetStateAction<string[]>>;
}
export interface FileWithMetadata {
  file: File;
  metadata: {
    isSupplementary: boolean;
  };
}
