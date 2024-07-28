import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '@redux/apis/courses/coursesApi';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  List,
  ListItem,
  Stack,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import CustomCheckboxButtonWithValue from '@components/Inputs/customCheckboxButton/CustomCheckboxButtonWithValue';
import Error from '@components/error/Error';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { QuizSubmission } from 'types/models/Eu';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { useTranslation } from 'react-i18next';
import { QUIZ_FORM_CONFIG } from '@features/courses/addCourse/AddCourseForm.constants';
import { GREY } from '@config/colors/colors';
import { StyledQuestionsContainer } from './PrestestPage.style';

function PretestPage() {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId as string);
  const [activeStep, setActiveStep] = useState(0);

  const quizFormMethods = useForm({
    defaultValues: { answers: {} },
    mode: 'onChange',
  });

  if (isLoading) return <FallbackLoader />;
  if (isError) return <Error />;

  const courseData = course?.data;

  const quiz = courseData?.quiz;

  const quizId = courseData?.quiz?.id;

  const [quizResults, setQuizResults] = useState<ItemDetailsResponse<QuizSubmission> | undefined>(
    undefined,
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmitQuiz = quizFormMethods.handleSubmit((values) => {
    console.log(values);
    // Submit your answers logic here
  });

  return (
    <Stack spacing={2} alignItems={'center'} mb={20}>
      <Typography variant="h4" gutterBottom>
        {courseData?.title}
      </Typography>
      <FormProvider {...quizFormMethods}>
        {quiz?.questions.map((question) => (
          <StyledQuestionsContainer key={question.id}>
            <Typography>{question.question}</Typography>
            <Stack>
              <List>
                {question.answers.map((answer, idx) => (
                  <ListItem key={idx}>
                    {question.type === QuestionTypeEnum.QCM ? (
                      <CustomCheckboxButtonWithValue
                        config={{
                          ...QUIZ_FORM_CONFIG.answer,
                          name: `answers[${question.id}].answer`,
                          options: [
                            {
                              label: answer.answer,
                              value: String(answer?.id),
                            },
                          ],
                        }}
                      />
                    ) : (
                      <CustomRadioButton
                        config={{
                          ...QUIZ_FORM_CONFIG.answer,
                          name: `answers[${question.id}].answer`,
                          options: [
                            { label: t('common.yes'), value: 1 },
                            { label: t('common.no'), value: 0 },
                          ],
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Stack>
          </StyledQuestionsContainer>
        ))}
        <Button
          variant="outlined"
          onClick={handleNext}
          fullWidth
          sx={{ borderRadius: 2, width: '700px' }}
        >
          {t('common.submit')}
        </Button>
      </FormProvider>
    </Stack>
  );
}

export default PretestPage;
