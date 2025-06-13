// src/theme.ts
import { createTheme } from '@mui/material/styles';

const CHARCOAL = '#161A1D';
const OFF_WHITE = '#FAF9F6';
const ACCENT_RED = '#E5383B';

const theme = createTheme({
  palette: {
    background: {
      default: CHARCOAL,
      paper: CHARCOAL,
    },
    text: {
      primary: OFF_WHITE,
      secondary: 'rgba(255,255,255,0.7)',
    },
    primary: { main: ACCENT_RED, contrastText: OFF_WHITE },
    secondary: { main: ACCENT_RED, contrastText: OFF_WHITE },
    error: { main: ACCENT_RED },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: CHARCOAL,
        },
      },
    },
  },
});

export default theme;
