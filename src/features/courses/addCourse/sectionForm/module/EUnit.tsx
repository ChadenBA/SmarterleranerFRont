import { Stack, Typography, Grid, Tooltip, Collapse, IconButton, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Add, Edit } from '@mui/icons-material';
import Question from '../question/Question';
import EuHead from './EuHead/EuHead';
import { ModuleRoot, QuizRoot, StyledArrowIcon } from './Eu.style';
import EuBody from './moduleBody/EuBody';
import { EuProps } from './Eu.type';
import { Quiz } from 'types/models/Quiz';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import { GREY } from '@config/colors/colors';
import trash from '@assets/logo/icon-trash.svg';

function EUnit({
  field,
  files,
  euIndex,
  canDelete,
  euFormMethods,
  isEditMode,
  type,
  loIndex,
  onAddEu,
  setFiles,
  handleAddAnswer,
  handleAddQuestion,
  handleRemoveAnswer,
  handleRemoveQuestion,
  handleRemoveEu,
  handleAddEuApi,
  handleAddLearningObject,
}: EuProps) {
  // Destructing the questions from the form methods

  const learningObjects = field?.learningObjects ?? [];
  const quiz = learningObjects[0]?.quiz as Quiz | undefined;

  const questions = quiz?.questions ?? [];

  // State Declaration
  const [expanded, setExpanded] = useState(isEditMode ? true : false);
  const [expandedQuiz, setExpandedQuiz] = useState(true);
  const [open, setOpen] = useState(false);
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const { t } = useTranslation();
  const [deletedMedia, setDeletedMedia] = useState<string[]>([]);

  const isNewSection = !field?.id || !field?.title || !field?.learningObjects[0]?.title;
  const isNewQuiz = quiz?.id || quiz?.questions[0]?.question;
  const handleChangeExpand = () => setExpanded((prev) => !prev);

  const handleDeleteOrRemoveSection = () => {
    isEditMode && !isNewSection ? setOpen(true) : handleRemoveEu(euIndex);
  };

  //watch the field title
  const title = euFormMethods.watch(`eu.${euIndex}.title`);

  const handleUpdateEuApi = euFormMethods.handleSubmit(async (values) => {
    // const sectionId = values.sections[index].databaseId
    // const sectionData = values.sections[index]
    // try {
    //   // Update Section api call
    //   await updateSection({
    //     sectionId,
    //     data: sectionData,
    //     files: files[index],
    //     deletedMedia,
    //   }).unwrap()
    //   // Dispatch success Snackbar
    //   dispatch(showSuccess(t('section.update_success')))
    //   setDeletedMedia([])
    //   dispatch(
    //     courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']),
    //   )
    // } catch (error) {
    //   // Dispatch error Snackbar
    //   dispatch(showError(t('errors.general_error')))
    // }
  });
  return (
    <>
      <ModuleRoot spacing={2} mb={1} mt={1}>
        <EuHead
          canDelete={canDelete}
          expanded={expanded}
          index={euIndex}
          isNewEu={isNewSection}
          title={title}
          onCreateEu={handleAddEuApi}
          onChangeExpanded={handleChangeExpand}
          onDeleteEu={handleDeleteOrRemoveSection}
          onUpdateEu={handleUpdateEuApi}
          type={type}
          onAddEu={onAddEu}
        />
        <Divider />
        <EuBody
          euIndex={euIndex}
          expanded={expanded}
          field={field}
          files={files}
          setFiles={setFiles}
          handleAddAnswer={handleAddAnswer}
          handleAddQuestion={handleAddQuestion}
          handleRemoveAnswer={handleRemoveAnswer}
          handleRemoveEu={handleRemoveEu}
          handleRemoveQuestion={handleRemoveQuestion}
          handleAddLearningObject={handleAddLearningObject}
          loIndex={loIndex}
          questions={questions}
          sectionFormMethods={euFormMethods}
          setDeletedMedia={setDeletedMedia}
          isEditMode={isEditMode}
        />
      </ModuleRoot>

      <QuizRoot>
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <StyledArrowIcon
              onClick={() => setExpandedQuiz(!expandedQuiz)}
              expanded={expandedQuiz ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
            />
            <Typography variant="h3" color="primary">
              {t('section.quiz.quiz')}
            </Typography>
          </Stack>
          {!isNewQuiz && !isNewSection ? (
            <IconButton color="info">
              <Tooltip title={t('section.quiz.add')}>
                <Add />
              </Tooltip>
            </IconButton>
          ) : (
            <Stack direction={'row'} spacing={1}>
              <IconButton color="info" onClick={() => {}}>
                <Tooltip title={t('section.quiz.update')}>
                  <Edit />
                </Tooltip>
              </IconButton>
              <IconButton color="error" onClick={() => setOpenQuizDialog(true)}>
                <Tooltip title={t('section.quiz.delete')}>
                  <DeleteOutlineOutlinedIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          )}
        </Stack>
        <Collapse in={expandedQuiz} timeout={700}>
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
            {questions?.map((i, questionIndex) => {
              return (
                <Grid item xs={12} key={i.id} p={2}>
                  <Question
                    handleAddQuestion={handleAddQuestion}
                    handleDeleteQuestion={() => {
                      isEditMode &&
                      !isNewSection &&
                      field?.learningObjects[loIndex]?.quiz.questions[questionIndex].id
                        ? setOpenQuestionDialog(true)
                        : handleRemoveQuestion(euIndex, loIndex, questionIndex);
                    }}
                    canDelete={questions.length > 1}
                    questionIndex={questionIndex}
                    field={field}
                    euIndex={euIndex}
                    loIndex={0}
                    euFormMethods={euFormMethods}
                    handleRemoveAnswer={() => {
                      isEditMode &&
                        !isNewSection &&
                        field.learningObjects[loIndex].quiz.questions[questionIndex].answers.map(
                          (j, answerIndex) => {
                            if (j.id) {
                              setOpenAnswerDialog(true);
                            } else {
                              handleRemoveAnswer(euIndex, loIndex, questionIndex, answerIndex);
                            }
                          },
                        );
                    }}
                    handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                  />
                </Grid>
              );
            })}
          </Stack>
        </Collapse>

        <CustomDialogActions
          open={open || openQuizDialog || openQuestionDialog || openAnswerDialog}
          onAccept={
            open
              ? () => {}
              : openQuizDialog
              ? () => {}
              : openQuestionDialog
              ? () => () => {}
              : () => () => {}
          }
          onClose={() => {
            setOpen(false);
            setOpenQuizDialog(false);
            setOpenQuestionDialog(false);
            setOpenAnswerDialog(false);
          }}
          onCancel={() => {
            setOpen(false);
            setOpenQuizDialog(false);
            setOpenQuestionDialog(false);
            setOpenAnswerDialog(false);
          }}
        >
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={trash} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {open
                ? t('section.delete_section_confirm')
                : openQuizDialog
                ? t('section.quiz.delete_quiz_confirm')
                : openQuestionDialog
                ? t('section.quiz.delete_question_confirm')
                : t('section.quiz.delete_answer_confirm')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {open
                ? t('section.delete_section')
                : openQuizDialog
                ? t('section.quiz.delete_quiz')
                : openQuestionDialog
                ? t('section.quiz.delete_question')
                : t('section.quiz.delete_answer')}
            </Typography>
          </Stack>
        </CustomDialogActions>
      </QuizRoot>
    </>
  );
}

export default EUnit;
