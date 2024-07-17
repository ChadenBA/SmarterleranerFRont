import { styled } from '@mui/material/styles'

export const ImageService = styled('img')(({ theme }) => ({
  width: '300px',
  height: '300px',
  marginLeft: "100px",

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))
