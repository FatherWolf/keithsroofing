// src/components/AdminLayout.tsx
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from './NavBar'; // or your admin nav, if different

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#161A1D',
          color: '#F5F3F4',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavBar />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>
        {/* <Footer /> */}
      </Box>
    </>
  );
}
