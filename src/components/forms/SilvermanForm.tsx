import React, { useEffect, useState, FormEvent } from 'react';
import {
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
  LinearProgress,
  CircularProgress,
  Alert as MuiAlert,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  useGetQuestionsQuery,
  useSubmitResponsesMutation,
} from '@redux/apis/user/silvermanQuestionsApi';
import { useAppDispatch } from '@redux/hooks';
import { showError } from '@redux/slices/snackbarSlice';
import AppAlert from '../appAlert/AppAlert';
import { PATHS } from '@config/constants/paths';

const QUESTIONS_PER_PAGE = 11;

const SilvermanForm: React.FC = () => {
  const { data: questions, isLoading, isError } = useGetQuestionsQuery();
  const [submitResponses] = useSubmitResponsesMutation();
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {}, [questions]);

  const handleResponseChange = (questionId: number, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateResponses(responses)) {
      dispatch(showError('Please answer all questions before submitting.'));
      return;
    }

    try {
      const formattedResponses = formatResponses(responses);
      await submitResponses(formattedResponses).unwrap();
      navigate(PATHS.DASHBOARD.STUDENT.ROOT);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const formatResponses = (responses: { [key: number]: string }): { responses: string[] } => {
    const sortedResponses = Object.keys(responses)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((key) => responses[parseInt(key)]);

    return { responses: sortedResponses };
  };

  const validateResponses = (responses: { [key: number]: string }): boolean => {
    return (
      questions?.length === Object.keys(responses).length &&
      Object.values(responses).every((response) => response)
    );
  };

  const handleNext = () => {
    if (currentPage < Math.ceil((questions?.length || 0) / QUESTIONS_PER_PAGE) - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <MuiAlert severity="error">Error fetching questions</MuiAlert>;

  const totalPages = Math.ceil((questions?.length || 0) / QUESTIONS_PER_PAGE);
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <Stack
      spacing={2}
      m={4}
      sx={{
        borderRadius: 4,
        boxShadow: 2,
        padding: 4,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Learning Style Questionnaire
      </Typography>
      <form onSubmit={handleSubmit}>
        {(questions || [])
          .slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE)
          .map((question, index) => (
            <Box key={question.id} mb={4}>
              <Typography variant="h6">
                {currentPage * QUESTIONS_PER_PAGE + index + 1}. {question.question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={responses[question.id] || ''}
                  onChange={(event) => handleResponseChange(question.id, event.target.value)}
                >
                  {question.answers.map((answer, answerIndex) => (
                    <FormControlLabel
                      key={answer.id}
                      value={answerIndex % 2 === 0 ? 'A' : 'B'}
                      control={<Radio />}
                      label={answer.answer}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Box width="100%" mx={2}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={currentPage < totalPages - 1}
          >
            Submit
          </Button>
        </Box>
      </form>
      <AppAlert /> {/* Include the custom alert component */}
    </Stack>
  );
};

export default SilvermanForm;
