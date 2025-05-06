// src/pages/Login.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { FirebaseAuth } from '../components/FirebaseAuth';

export default function Login() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 360, width: '100%' }} elevation={6}>
        <Typography variant="h5" align="center" mb={3}>
          Keith’s Roofing Admin
        </Typography>
        <FirebaseAuth />
      </Paper>
    </Box>
  );
}
