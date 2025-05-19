// src/components/NavBar.tsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Location', href: '/location' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggle = () => setOpen((o) => !o);

  const linkStyle = (href: string) => ({
    color: '#FFFFFF',
    textTransform: 'none',
    borderBottom:
      location.pathname === href || hovered === href
        ? `2px solid ${theme.palette.primary.main}`
        : '2px solid transparent',
    transition: 'border-bottom-color 0.2s',
    '&:hover': { borderBottomColor: theme.palette.primary.main },
  });

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#0B090A', boxShadow: 'none' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 48, width: 'auto' }}
            />
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  component={RouterLink}
                  to={item.href}
                  sx={linkStyle(item.href)}
                  onMouseEnter={() => setHovered(item.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={toggle} sx={{ color: '#FFFFFF' }}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={toggle}>
        <Box sx={{ width: 240 }} role="presentation" onClick={toggle}>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.href}
                  sx={linkStyle(item.href)}
                  onMouseEnter={() => setHovered(item.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
