// src/pages/Login.tsx
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Login() {
  const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider).catch(console.error);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" mb={2}>
        Admin Login
      </Typography>
      <Button variant="contained" onClick={loginWithGoogle}>
        Sign in with Google
      </Button>
    </Box>
  );
}
