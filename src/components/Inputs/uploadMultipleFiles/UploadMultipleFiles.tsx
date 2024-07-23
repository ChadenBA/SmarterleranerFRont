import { Grid } from '@mui/material';
import { UploadMultipleFilesProps } from './UplaodMultipleFiles.type';
import UploadInput from '../uploadInput/UploadInput';
import { ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

function UploadMultipleFiles({
  files,
  euIndex,
  loIndex,
  isEditMode,
  isSupplementary,
  setFiles,
  setDeletedMedia,
}: UploadMultipleFilesProps) {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map((file) => ({
      file: file,
      metadata: { isSupplementary },
    }));

    if (newFiles.length) {
      setFiles((prev) => ({
        ...prev,
        [euIndex]: {
          ...prev[euIndex],
          [loIndex]: [...(prev[euIndex]?.[loIndex] || []), ...newFiles],
        },
      }));
    }
  };
  const handleDeletePreview = (event: MouseEvent<SVGSVGElement>, fileIndex: number) => {
    event.stopPropagation();
    const fileObject = files[fileIndex];
    if (fileObject.file.name.includes(GLOBAL_VARIABLES.BACKEND_SCHEMA)) {
      setDeletedMedia((prev) => [...prev, fileObject.file.name]);
    }
    setFiles((prev) => ({
      ...prev,
      [euIndex]: {
        ...prev[euIndex],
        [loIndex]: (prev[euIndex]?.[loIndex] || []).filter((_, index) => index !== fileIndex),
      },
    }));
    URL.revokeObjectURL(URL.createObjectURL(fileObject.file));
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <UploadInput
          label={t('common.upload')}
          onChange={handleChange}
          onDelete={(e) => handleDeletePreview(e, 0)}
          preview={null}
          multiple
        />
      </Grid>
      <Grid container spacing={2}>
        {files.map(({ file }, fileIndex) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <Grid item key={fileIndex} xs={12} sm={4}>
              <UploadInput
                isEditMode={isEditMode}
                onChange={handleChange}
                onDelete={(e) => handleDeletePreview(e, fileIndex)}
                preview={previewUrl}
                file={file}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
export default UploadMultipleFiles;
