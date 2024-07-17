import { Typography, styled } from '@mui/material';
import { BLUE } from '@config/colors/colors';

export const LinkStyled = styled(Typography)({
  fontSize: '.82rem',
  color: BLUE.main,
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: 'bold',
  padding: '0 4px',
});
