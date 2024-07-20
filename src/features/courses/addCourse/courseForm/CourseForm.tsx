import { Grid, Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { CourseFormProps } from './CourseForm.type';
import { CREATE_COURSE_FORM_CONFIG, Quiz } from './CourseForm.constants';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField';
import useCourseForm from './useCourseForm';
import useUploadFile from 'src/hooks/useUploadFile';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useTranslation } from 'react-i18next';
import { generatePictureSrc } from '@utils/helpers/string.helpers';
import Question from '../sectionForm/question/Question';

function CourseForm({ formMethods, defaultValues }: CourseFormProps) {
  const {
    isLoadingData,
    categoryOptions,
    subCategoriesOption,
    selectedCategory,
    handleAddQuestion,
    handleRemoveQuestion,
    fields,
  } = useCourseForm({
    formMethods,
  });

  const { t } = useTranslation();

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods,
    fieldName: 'courseMedia',
    initPreview: generatePictureSrc(defaultValues?.courseMedia.name) || null,
    index: 0,
  });

  const isEditMode = !!defaultValues;

  if (isLoadingData) return <FallbackLoader />;

  return (
    <FormProvider {...formMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} gap={2}>
            <Stack mb={2}>
              <CustomTextField config={CREATE_COURSE_FORM_CONFIG.title} />
            </Stack>
            <Stack mb={2} direction="row" gap={2}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.category,
                  options: categoryOptions,
                }}
              />
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.subCategory,
                  disabled: !selectedCategory,
                  options: subCategoriesOption,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={CREATE_COURSE_FORM_CONFIG.description} />
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

          <Grid item xs={12}>
            <Stack spacing={1}>
              {fields?.map((i, questionIndex) => (
                <Question
                  key={i.id || questionIndex} // Ensure each child in a list has a unique "key" prop
                  handleAddQuestion={handleAddQuestion}
                  handleDeleteQuestion={() => {
                    // isEditMode && !isNewSection && field.quiz.questions[questionIndex].id
                    //   ? setOpenQuestionDialog(true)
                    //   : handleRemoveQuestion(index, questionIndex);
                    handleRemoveQuestion(1, questionIndex);
                  }}
                  canDelete={fields.length > 1}
                  questionIndex={questionIndex}
                  field={i}
                  sectionIndex={index}
                  handleRemoveAnswer={() => {
                    isEditMode &&
                      !isNewSection &&
                      field.quiz.questions[questionIndex].answers.map((j, answerIndex) => {
                        if (j.id) {
                          setOpenAnswerDialog(true);
                        } else {
                          handleRemoveAnswer(index, questionIndex, answerIndex);
                        }
                      });
                  }}
                  handleAddAnswer={() => handleAddAnswer(index, questionIndex)}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

export default CourseForm;
