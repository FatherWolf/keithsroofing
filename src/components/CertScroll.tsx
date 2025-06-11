// src/components/CertificationsCarousel.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const logos = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/BBB_accredited_business_logo.svg/1200px-BBB_accredited_business_logo.svg.png',
    alt: 'BBB Accredited Business',
  },
  {
    src: 'https://via.placeholder.com/200x80?text=TAMKO+Pro',
    alt: 'TAMKO Pro',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/CertainTeed_logo.svg/1200px-CertainTeed_logo.svg.png',
    alt: 'CertainTeed',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/VELUX_Logo.svg/1200px-VELUX_Logo.svg.png',
    alt: 'VELUX',
  },
  {
    src: '/images/hsv2024.png',
    alt: "Hot Springs Village Readers' Choice 2024",
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/AtticBreeze_logo.png/600px-AtticBreeze_logo.png',
    alt: 'Attic Breeze',
  },
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
      {/* Heading */}
      <Typography
        id="certifications-heading"
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}
      >
        TRUST THE EXPERTS
      </Typography>

      {/* Divider */}
      <Box
        sx={{
          height: 2,
          width: 80,
          bgcolor: theme.palette.error.main,
          mx: 'auto',
          mb: 4,
        }}
      />

      {/* Logo carousel */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 4,
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
            component="img"
            key={idx}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            sx={{
              height: 80,
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
