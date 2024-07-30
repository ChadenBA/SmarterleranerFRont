import React from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import { useGetResultQuery } from '@redux/apis/user/silvermanQuestionsApi';
import ResultsDisplay from '@components/silvermanResult/ResultDisplay';
import ResultExplanation from '@components/silvermanResult/ResultExplanation';

const Resultp: React.FC = () => {
  const { data, isLoading, isError, error } = useGetResultQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    let errorMessage = 'Error fetching results';

    if (error) {
      if ('status' in error && error.data) {
        errorMessage = `Error ${error.status}: ${
          (error.data as { message?: string }).message || 'Unknown error'
        }`;
      } else if ('message' in error) {
        errorMessage = (error as { message: string }).message;
      }
    }

    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (
    !data ||
    !data.result ||
    !data.result.scores ||
    Object.keys(data.result.scores).length === 0
  ) {
    return <Alert severity="error">No results available</Alert>;
  }

  return (
    <Container>
      <ResultsDisplay scores={data.result.scores} />
      <ResultExplanation scores={data.result.scores} />
    </Container>
  );
};

export default Resultp;
