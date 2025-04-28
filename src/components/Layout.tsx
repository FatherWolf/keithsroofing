import React from 'react';
import { Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Seo } from './Seo';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo
        title="Keith's Roofing"
        description="Premium roofing services for discerning clients."
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Keith’s Roofing</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box component="main" my={4}>
          {children}
        </Box>
      </Container>
      <Box component="footer" textAlign="center" py={2}>
        &copy; {new Date().getFullYear()} Keith's Roofing
      </Box>
    </>
  );
}
