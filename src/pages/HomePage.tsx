// src/pages/HomePage.tsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';

export default function HomePage() {
  const theme = useTheme();
  const jsonLd = {
    /* as before */
  };

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Top-tier roofing for discerning clients. Get your free estimate now."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <Box
        component="section"
        aria-label="Hero"
        sx={{
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: `
            linear-gradient(135deg, ${theme.palette.primary.dark}CC 0%, ${theme.palette.primary.main}CC 100%),
            url(https://via.placeholder.com/1600x900)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: theme.palette.primary.contrastText,
          textShadow: '0px 2px 4px rgba(0,0,0,0.6)',
          p: 3,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Keith’s Roofing
        </Typography>
        <Typography variant="h2" component="h2" mb={4}>
          Premium Roofing Solutions for Discerning Clients
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/contact"
        >
          Get a Quote
        </Button>
      </Box>

      {/* About */}
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="https://via.placeholder.com/600x400"
            alt="Team at work"
            loading="lazy"
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />
          <Box>
            <Typography variant="h2" component="h3" gutterBottom>
              Why Choose Us?
            </Typography>
            <Typography paragraph>
              At Keith’s Roofing, we combine master craftsmanship with the
              finest materials to deliver roofs that never compromise on style
              or durability.
            </Typography>
            <Button variant="outlined" color="primary" href="/about">
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Final CTA */}
      <Box
        component="section"
        sx={{
          bgcolor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          py: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Ready for a Roof That Turns Heads?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/contact"
        >
          Contact Our Experts
        </Button>
      </Box>
    </>
  );
}
