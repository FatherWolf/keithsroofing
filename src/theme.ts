// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#E5383B',
      main: '#BA181B',
      dark: '#660708',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#161A1D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F3F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0B090A',
      secondary: '#161A1D',
    },
    error: {
      main: '#A4161A',
    },
    info: {
      main: '#B1A7A6',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
});

export default theme;
