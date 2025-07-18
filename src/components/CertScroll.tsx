// src/components/CertificationsCarousel.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import atticlogo from '../images/Seals/attic-breeze-certified-installer.png';
import bbblogo from '../images/Seals/bbb.png';
import certainteedlogo from '../images/Seals/CertainTeed-ShingleMaster.png';
import villagechoicelogo from '../images/Seals/villagechoicesmall.png';
import tamkopro from '../images/Seals/tamkopro.png';

const logos = [
  { src: tamkopro, alt: 'Tamko Pro' },
  { src: bbblogo, alt: 'BBB Accredited Business' },
  { src: certainteedlogo, alt: 'CertainTeed' },
  { src: villagechoicelogo, alt: "Hot Springs Village Readers' Choice 2024" },
  { src: atticlogo, alt: 'Attic Breeze' },
];

export default function CertificationsCarousel() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      aria-labelledby="certifications-heading"
      sx={{
        py: 6,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography
        id="certifications-heading"
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}
      >
        TRUST THE EXPERTS
      </Typography>

      <Box
        sx={{
          height: 2,
          width: 80,
          bgcolor: theme.palette.error.main,
          mx: 'auto',
          mb: 4,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'auto',
          gap: 6,
          px: 2,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: 3,
          },
          scrollSnapType: 'x mandatory',
        }}
      >
        {logos.map((logo, idx) => (
          <Box
            key={idx}
            component="img"
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            sx={{
              height: 100,
              objectFit: 'contain',
              scrollSnapAlign: 'center',
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
