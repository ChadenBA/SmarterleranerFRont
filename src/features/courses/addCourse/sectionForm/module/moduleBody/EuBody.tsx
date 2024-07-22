import { Collapse, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadMultipleFiles from '@components/Inputs/uploadMultipleFiles/UploadMultipleFiles';
import {
  CREATE_EDUCATIONAL_UNIT_FORM_CONFIG,
  CREATE_LEARNING_OBJECT_FORM_CONFIG,
} from '../../EuForm.constants';
import { EuBodyProps } from './EuBody.type';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Question from '../../question/Question';
import { GREY } from '@config/colors/colors';

function EuBody({
  expanded,
  files,
  euIndex,
  loIndex,
  isEditMode,
  questions,
  field,
  sectionFormMethods,
  setFiles,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
  setDeletedMedia,
}: EuBodyProps) {
  const { t } = useTranslation();
  return (
    <Collapse in={expanded} timeout={700}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            config={{
              ...CREATE_EDUCATIONAL_UNIT_FORM_CONFIG.title,
              name: `eu.${euIndex}.title`,
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <CustomTextField
            config={{
              ...CREATE_EDUCATIONAL_UNIT_FORM_CONFIG.type,
              name: `eu.${euIndex}.type`,
            }}
          />
        </Grid> */}
        {/*  Learning objects for the educational unit */}
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            margin: 4,
            padding: 2,
            border: `1px solid ${GREY.light}`,
            borderRadius: 8,
          }}
        >
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Typography variant="h5">{t('eu.learning_objects')}</Typography>
              <IconButton onClick={() => handleAddQuestion(euIndex, loIndex)} color="success">
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              config={{
                ...CREATE_LEARNING_OBJECT_FORM_CONFIG.title,
                name: `eu.${euIndex}.learningObjects.${loIndex}.title`,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomRadioButton
              config={{
                ...CREATE_LEARNING_OBJECT_FORM_CONFIG.type,
                name: `eu.${euIndex}.learningObjects.${loIndex}.type`,
              }}
            />
          </Grid>

          <UploadMultipleFiles
            files={files[loIndex] || []}
            index={loIndex}
            setFiles={setFiles}
            isEditMode={isEditMode}
            setDeletedMedia={setDeletedMedia}
          />

          {!isEditMode && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
          {!isEditMode && (
            <Stack spacing={2} width="100%" p={8}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography color="primary" fontWeight={'medium'} variant="h2">
                  {t('section.quiz.questions')}
                </Typography>

                <Tooltip title={t('section.quiz.add_question')} placement="right">
                  <IconButton onClick={() => handleAddQuestion(euIndex, loIndex)} color="success">
                    <AddCircleOutlineOutlinedIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider />
              {questions?.map((_, questionIndex) => {
                return (
                  <Grid item xs={12} key={questionIndex} p={2}>
                    <Question
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleRemoveQuestion(euIndex, loIndex, questionIndex)
                      }
                      canDelete={questions.length > 1}
                      questionIndex={questionIndex}
                      field={field}
                      euIndex={euIndex}
                      loIndex={loIndex}
                      euFormMethods={sectionFormMethods}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                    />
                  </Grid>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Grid>
    </Collapse>
  );
}

export default EuBody;
