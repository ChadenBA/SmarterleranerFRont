import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Tooltip } from '@mui/material';
import {
  StyledDeleteIcon,
  StyledInputContainer,
  StyledInputTypography,
  StyledPreviewContainer,
  StyledPreviewImage,
  StyledPreviewPdf,
  StyledPreviewVideo,
  StyledUploadIcon,
} from './UploadInput.style';
import { UploadInputProps } from './UploadInput.type';
import { Media } from 'types/models/Media';

function UploadInput({ preview, multiple, label, file, onChange, onDelete }: UploadInputProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);

  const handleOnContainerClick = () => {
    ref.current?.click();
  };

  const getFileURL = (file: File | Media) => {
    if ('fileName' in file) {
      return file.fileName;
    } else {
      return URL.createObjectURL(file);
    }
  };

  const getFileMimeType = (file: File | Media): string => {
    return 'mimeType' in file ? file.mimeType : file.type;
  };

  const FilePreview = ({ file }: { file: File | Media }) => {
    const fileURL = getFileURL(file);
    const mimeType = getFileMimeType(file);

    if (mimeType.startsWith('image/')) {
      return <StyledPreviewImage src={fileURL} alt="File preview" />;
    } else if (mimeType.startsWith('video/')) {
      return (
        <StyledPreviewVideo controls>
          <source src={fileURL} type={mimeType} />
        </StyledPreviewVideo>
      );
    } else if (mimeType === 'application/pdf') {
      return (
        <StyledPreviewPdf data={fileURL}>
          <embed src={fileURL} type="application/pdf" width="100%" height="100%" />
        </StyledPreviewPdf>
      );
    } else if (mimeType.startsWith('audio/')) {
      return <audio controls src={fileURL} style={{ marginTop: '20%', width: '100%' }} />;
    } else {
      return <div>Unsupported file type</div>;
    }
  };

  return (
    <>
      <Stack direction={'column'} spacing={1} width={'100%'}>
        {label && <StyledInputTypography variant="h6">{label}</StyledInputTypography>}

        <StyledInputContainer onClick={handleOnContainerClick}>
          {preview ? (
            <StyledPreviewContainer>
              {file && FilePreview({ file }) ? (
                FilePreview({ file })
              ) : (
                <StyledPreviewImage src={preview} />
              )}
              <Tooltip title={t('common.delete')} arrow>
                <StyledDeleteIcon onClick={onDelete} />
              </Tooltip>
            </StyledPreviewContainer>
          ) : (
            <StyledUploadIcon />
          )}
        </StyledInputContainer>
      </Stack>
      <input
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: 'none' }}
        multiple={multiple}
      />
    </>
  );
}

export default UploadInput;
