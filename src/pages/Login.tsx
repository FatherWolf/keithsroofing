// src/pages/Login.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FirebaseAuth from '../components/FirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [user, loading] = useAuthState(auth);

  // 1) While we’re checking auth, show a loader.
  if (loading) return <div>Loading…</div>;

  // 2) If already signed in, redirect to /admin
  if (user) return <Navigate to="/admin" replace />;

  // 3) Otherwise show the login card
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
          Admin Login
        </Typography>
        <FirebaseAuth />
      </Paper>
    </Box>
  );
}
