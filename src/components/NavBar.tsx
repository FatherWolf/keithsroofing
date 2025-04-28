// src/components/NavBar.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Location', href: '/location' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{ justifyContent: isMobile ? 'space-between' : 'flex-start' }}
        >
          {isMobile && (
            <IconButton onClick={toggle} edge="start" aria-label="menu">
              <MoreVertIcon fontSize="large" />
            </IconButton>
          )}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggle}>
        <Box sx={{ width: 240 }} role="presentation" onClick={toggle}>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href}>
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
