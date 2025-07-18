// src/pages/ServicesPage.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';
import FinancingModule from '../components/FinancingModule';
import customInstallImg from '../images/IMG_4332.jpeg';
import restorationBeforeImg from '../images/before.jpg';
import restorationAfterImg from '../images/after.jpg';

export default function ServicesPage() {
  const theme = useTheme();

  return (
    <>
      <Seo
        title="Keith’s Roofing | Our Services"
        description="Explore our custom installations, restorations & repairs, and annual inspections."
      />

      <Container sx={{ py: 6 }}>
        {/* — SUB-MENU — */}
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
          <Button href="#custom-installation" sx={{ textTransform: 'none' }}>
            Custom Installation
          </Button>
          <Button href="#restorations-repairs" sx={{ textTransform: 'none' }}>
            Restorations & Repairs
          </Button>
          <Button href="#annual-inspections" sx={{ textTransform: 'none' }}>
            Annual Inspections
          </Button>
        </Box>

        {/* — NEED FINANCING? — */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            py: 4,
            mb: 4,
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Need Financing?
          </Typography>
          <Typography variant="body1" paragraph>
            With GreenSky® Financing you can get an instant credit decision
            online, often pay no interest if paid in full within the promotional
            period, and spread your project cost out over flexible, fixed
            monthly payments—no prepayment penalties and a 100% digital
            application.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FinancingModule />
          </Box>
        </Box>

        {/* — CUSTOM INSTALLATION — */}
        <Box
          id="custom-installation"
          component="section"
          sx={{ py: 4, scrollMarginTop: '80px' }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            Custom Installation
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={customInstallImg}
              alt="Professional roof installation"
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />

            <Box>
              <Typography variant="body1" paragraph>
                Whether you’re building new or upgrading an existing roof,
                Keith’s Roofing delivers a flawless installation combining
                durability with striking curb appeal—on time and on budget.
              </Typography>
              <Typography variant="body1" paragraph>
                We partner with leading shingle, metal, and flat-roof
                manufacturers to tailor the perfect balance of performance,
                style, and value for your home.
              </Typography>
              <Button
                variant="contained"
                href="/roof-colors"
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  bgcolor: theme.palette.secondary.main,
                  '&:hover': { bgcolor: theme.palette.secondary.dark },
                }}
              >
                See Roofing Colors
              </Button>
            </Box>
          </Box>
        </Box>

        {/* — RESTORATIONS & REPAIRS — */}
        <Box
          id="restorations-repairs"
          component="section"
          sx={{ py: 4, scrollMarginTop: '80px' }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            Restorations & Repairs
          </Typography>

          {/* before & after images */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={restorationBeforeImg}
                alt="Before Roof Restoration"
                sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Before
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={restorationAfterImg}
                alt="After Roof Restoration"
                sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                After
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            Got damage from storms, age, or wear? We’ll restore your roof’s
            integrity quickly and with minimal disruption to your life.
          </Typography>
        </Box>

        {/* — ANNUAL INSPECTIONS — */}
        <Box
          id="annual-inspections"
          component="section"
          sx={{ py: 4, scrollMarginTop: '80px' }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            Annual Inspections
          </Typography>
          <Typography variant="body1">
            Stay ahead of leaks and costly repairs—our free 10-point inspection
            keeps your roof in peak condition year-round.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
