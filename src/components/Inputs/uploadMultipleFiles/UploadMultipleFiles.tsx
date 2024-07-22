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
  setFiles,
  setDeletedMedia,
}: UploadMultipleFilesProps) {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
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
    const file = files[fileIndex];
    if (file.name.includes(GLOBAL_VARIABLES.BACKEND_SCHEMA)) {
      setDeletedMedia((prev) => [...prev, file.name]);
    }
    setFiles((prev) => ({
      ...prev,
      [euIndex]: {
        ...prev[euIndex],
        [loIndex]: (prev[euIndex]?.[loIndex] || []).filter((f) => f !== file),
      },
    }));
    if (file) {
      URL.revokeObjectURL(URL.createObjectURL(file));
    }
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
      <Grid item xs={12} gap={2} display="flex">
        {files.map((file, fileIndex) => (
          <Grid item key={fileIndex} xs={12} sm={4}>
            <UploadInput
              isEditMode={isEditMode}
              onChange={handleChange}
              onDelete={(e) => handleDeletePreview(e, fileIndex)}
              preview={URL.createObjectURL(file)}
              file={file}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UploadMultipleFiles;
