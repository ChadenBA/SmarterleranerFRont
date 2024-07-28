import { Stack, styled } from '@mui/material';

export const StyledQuestionsContainer = styled(Stack)(({ theme }) => ({
  width: '90%',
  height: 'auto',
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[5],
  borderRadius: '10px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
  
}));
