// src/components/Layout.tsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { Seo } from './Seo';
import { NavBar } from './NavBar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* SEO metadata */}
      <Seo
        title="Keith's Roofing"
        description="Premium roofing services for discerning clients."
      />

      {/* Primary navigation in the header */}
      <header>
        <NavBar />
      </header>

      {/* Main content area */}
      <Container maxWidth="lg">
        <Box component="main" my={4}>
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" textAlign="center" py={2}>
        &copy; {new Date().getFullYear()} Keith's Roofing
      </Box>
    </>
  );
}
