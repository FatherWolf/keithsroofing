// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../images/logo.PNG';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Location', to: '/location' },
  { label: 'Contact', to: '/contact' },
  { label: 'Gallery', to: '/gallery' }, // ← updated
];

export function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ height: 40, mr: 1 }}
            />
            {!isMobile && (
              <Box sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                Keith's Roofing
              </Box>
            )}
          </Box>

          {isMobile ? (
            <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Button
                    key={item.to}
                    component={Link}
                    to={item.to}
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      borderBottom: active
                        ? `2px solid ${theme.palette.error.main}`
                        : '2px solid transparent',
                      '&:hover': {
                        borderBottom: `2px solid ${theme.palette.error.main}`,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{ sx: { backgroundColor: '#000', color: '#fff' } }}
      >
        <List sx={{ width: 240 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={toggleDrawer}
              sx={{
                color: 'inherit',
                borderLeft:
                  pathname === item.to
                    ? `4px solid ${theme.palette.error.main}`
                    : '4px solid transparent',
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ color: 'inherit' }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
