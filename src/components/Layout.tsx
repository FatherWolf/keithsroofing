// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/services" color="inherit">
              Services
            </Button>
            <Button component={RouterLink} to="/location" color="inherit">
              Location
            </Button>
            <Button component={RouterLink} to="/contact" color="inherit">
              Contact
            </Button>
            <Button component={RouterLink} to="/faq" color="inherit">
              FAQ
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
}
