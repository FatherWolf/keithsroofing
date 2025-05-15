import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component="span"
            sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}
          >
            Keith’s Roofing Admin
          </Box>
          <IconButton color="inherit" onClick={() => signOut(auth)}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  );
}
