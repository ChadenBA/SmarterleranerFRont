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
  isEditMode,
  field,
  sectionFormMethods,
  setFiles,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
  setDeletedMedia,
  handleAddLearningObject,
}: EuBodyProps) {
  const { t } = useTranslation();
  return (
    <Collapse in={expanded} timeout={700}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} pr={5}>
          <CustomTextField
            config={{
              ...CREATE_EDUCATIONAL_UNIT_FORM_CONFIG.title,
              name: `eu.${euIndex}.title`,
            }}
          />
        </Grid>

        {/*  Learning objects for the educational unit */}

        {field.learningObjects.map((lo, loIndex) => (
          <Stack
            key={loIndex}
            spacing={2}
            sx={{
              width: '100%',
              margin: 3,
              padding: 1.5,
              border: `1px solid ${GREY.light}`,
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={0} p={0} m={0} alignItems="center">
              <Typography variant="h3" pt={0.2}>
                {t('eu.learning_objects')}
              </Typography>
              <IconButton onClick={() => handleAddLearningObject(euIndex)} color="success">
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Stack>
            <Divider />
            <Grid container spacing={3} alignItems={'center'}>
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
                    disabled: loIndex === 0 || loIndex === 1,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <UploadMultipleFiles
                  files={files[loIndex] || []}
                  index={loIndex}
                  setFiles={setFiles}
                  isEditMode={isEditMode}
                  setDeletedMedia={setDeletedMedia}
                />
              </Grid>
            </Grid>
            {!isEditMode && (
              <Stack spacing={2} width="100%" p={8}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography color="primary" fontWeight="medium" variant="h2">
                    {t('section.quiz.questions')}
                  </Typography>
                  <Tooltip title={t('section.quiz.add_question')} placement="right">
                    <IconButton onClick={() => handleAddQuestion(euIndex, loIndex)} color="success">
                      <AddCircleOutlineOutlinedIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Divider />
                {lo.quiz.questions?.map((q, questionIndex) => (
                  <Grid item xs={12} key={q.id} p={0}>
                    <Question
                      key={field.id}
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleRemoveQuestion(euIndex, loIndex, questionIndex)
                      }
                      canDelete={lo.quiz.questions?.length > 1}
                      questionIndex={questionIndex}
                      field={field}
                      euIndex={euIndex}
                      loIndex={loIndex}
                      euFormMethods={sectionFormMethods}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                    />
                  </Grid>
                ))}
              </Stack>
            )}
          </Stack>
        ))}

        {/* <Stack
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
              <IconButton onClick={() => handleAddLearningObject(euIndex, loIndex)} color="success">
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
                      loIndex={0}
                      euFormMethods={sectionFormMethods}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                    />
                  </Grid>
                );
              })}
            </Stack>
          )}
        </Stack> */}
      </Grid>
    </Collapse>
  );
}

export default EuBody;
