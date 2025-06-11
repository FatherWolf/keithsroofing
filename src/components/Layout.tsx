// src/components/Layout.tsx
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from './NavBar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#161A1D', // dark charcoal
          color: '#F5F3F4', // light text
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavBar />
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
        {/* <Footer /> */}
      </Box>
    </>
  );
}
