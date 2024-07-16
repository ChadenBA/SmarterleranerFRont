import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

import { BLUE, GREY } from '@config/colors/colors'
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(16),
  width: '100%',
  background: theme.palette.background.default,
  color: theme.palette.common.white,
  height: '100vh',
  zIndex: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    padding: theme.spacing(4),
    height: '100vh',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
    display: 'block',
    height: '130vh',
  },
}))

export const HeaderContent = styled(Stack)(({ theme }) => ({
  gap: '20px',
  '& > h1': {
    color: BLUE.main,
    fontSize: '3rem',
    width: '70vh',
    lineHeight: 1.4,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
      width: 'auto',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '2.5rem',
      with: 'auto',
    },
  },
  '& > h2': {
    color: GREY.main,
    fontSize: '1rem',
    width: '70vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '0.875rem',
    },
  },
  '& > h3' : {
    color: BLUE.light,
    fontSize: '0.7rem',
    width: '70vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '0.875rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '35px',
  },
}))

export const HeaderImage = styled('img')(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '10vh',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10vh',
    height: 'auto',
  },
}))
