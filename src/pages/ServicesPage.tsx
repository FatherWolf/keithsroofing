// src/pages/ServicesPage.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';

const SECTIONS: { id: string; label: string; content: string }[] = [
  {
    id: 'custom-installation',
    label: 'Custom Installation',
    content:
      'Our expert team handles everything from shingle and metal to flat roof installs—tailored to your home’s style and budget.',
  },
  {
    id: 'restorations-repairs',
    label: 'Restorations & Repairs',
    content:
      'Got damage from storms, age, or wear? We’ll restore your roof’s integrity quickly and with minimal disruption to your life.',
  },
  {
    id: 'annual-inspections',
    label: 'Annual Inspections',
    content:
      'Stay ahead of leaks and costly repairs—our free 10-point inspection keeps your roof in peak condition year-round.',
  },
  {
    id: 'insurance-claims',
    label: 'Insurance Claims',
    content:
      'We document damage, provide detailed estimates, and work directly with your insurer—making your claim process painless.',
  },
];

export default function ServicesPage() {
  const theme = useTheme();

  return (
    <>
      <Seo
        title="Keith’s Roofing | Our Services"
        description="Explore our custom installations, restorations & repairs, annual inspections, and hassle-free insurance claims."
      />

      <Container sx={{ py: 6 }}>
        {/* Sub-menu */}
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 4,
          }}
        >
          {SECTIONS.map((sec) => (
            <Button
              key={sec.id}
              href={`#${sec.id}`}
              sx={{ textTransform: 'none' }}
            >
              {sec.label}
            </Button>
          ))}
        </Box>

        {/* Sections */}
        {SECTIONS.map((sec) => (
          <Box
            key={sec.id}
            id={sec.id}
            component="section"
            sx={{ py: 4, scrollMarginTop: '80px' }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
            >
              {sec.label}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              {sec.content}
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  );
}
