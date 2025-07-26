// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, CircularProgress, Typography } from '@mui/material';
import { auth } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  if (error) {
    console.error('Authentication error:', error);
    return <Navigate to={redirectTo} replace />;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
