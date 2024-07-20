import { Grid, Stack } from '@mui/material';
import { CourseFormProps } from './CourseForm.type';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField';
import { ConfigEnv } from '@config/configEnv';
import { CREATE_COURSE_FORM_CONFIG } from './CourseForm.constants';
import useCourseForm from './useCourseForm';
import useUploadFile from 'src/hooks/useUploadFile';
import { FormProvider } from 'react-hook-form';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useTranslation } from 'react-i18next';
import { generatePictureSrc } from '@utils/helpers/string.helpers';

function CourseForm({ formMethods, defaultValues }: CourseFormProps) {
  const { isLoadingAdditinalData, categoryOptions } = useCourseForm({ formMethods });

  const { t } = useTranslation();

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods,
    fieldName: 'courseMedia',
    initPreview: generatePictureSrc(defaultValues?.courseMedia.name) || null,
    index: 0,
    id: 0,
  });

  if (isLoadingAdditinalData) return <FallbackLoader />;

  return (
    <FormProvider {...formMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack mb={2}>
              <CustomTextField config={CREATE_COURSE_FORM_CONFIG.title} />
            </Stack>
            <Stack mb={2}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.category,
                  options: categoryOptions,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={CREATE_COURSE_FORM_CONFIG.description} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomRadioButton config={CREATE_COURSE_FORM_CONFIG.isPaid} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <UploadInput
                onChange={handleOnChange}
                onDelete={handleResetPreview}
                preview={preview}
                label={t('course.upload_media')}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

export default CourseForm;
