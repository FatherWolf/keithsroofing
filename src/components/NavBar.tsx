// src/components/NavBar.tsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
];

export function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 40, mr: 1 }}
            />
            {!isMobile && (
              <Box
                component="span"
                sx={{ fontWeight: 700, fontSize: '1.25rem' }}
              >
                Keith's Roofing
              </Box>
            )}
          </Box>

          {/* Desktop Links or Mobile Menu Icon */}
          {isMobile ? (
            <IconButton
              onClick={toggleDrawer}
              edge="end"
              aria-label="menu"
              sx={{ color: 'inherit' }}
            >
              <MoreVertIcon fontSize="large" />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Button
                    key={item.label}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
          },
        }}
      >
        <List sx={{ width: 240 }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to;
            return (
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.to}
                onClick={toggleDrawer}
                sx={{
                  color: 'inherit',
                  borderLeft: active
                    ? `4px solid ${theme.palette.error.main}`
                    : '4px solid transparent',
                  '&:hover': { backgroundColor: theme.palette.grey[900] },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ color: 'inherit' }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
