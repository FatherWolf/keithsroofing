// src/components/NavBar.tsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo spot */}
          <Box
            component="a"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Keith's Roofing Logo"
              sx={{ height: 48, width: 'auto', mr: 1 }}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary, fontWeight: 700 }}
              >
                Keith's Roofing
              </Typography>
            )}
          </Box>

          {/* Nav links or menu icon */}
          {isMobile ? (
            <IconButton onClick={toggle} edge="end" aria-label="menu">
              <MoreVertIcon fontSize="large" />
            </IconButton>
          ) : (
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

      {/* Mobile drawer */}
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
