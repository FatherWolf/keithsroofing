// src/pages/ServicesPage.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';
import FinancingModule from '../components/FinancingModule';
import customInstallImg from '../images/IMG_4332.jpeg';

const SECTIONS: { id: string; label: string; content: string }[] = [
  {
    id: 'custom-installation',
    label: 'Custom Installation',
    content: '', // we handle this one manually below
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
            {/* Image */}
            <Box
              component="img"
              src={customInstallImg}
              alt="Professional roof installation"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />

            {/* Text & Button */}
            <Box>
              <Typography variant="body1" paragraph>
                At Keith’s Roofing, we specialize in professional roof
                installations and replacements that combine durability with
                striking curb appeal. Whether you’re building new or upgrading
                an existing roof, our expert crew guides you through material
                selection and delivers a flawless installation—on time and on
                budget.
              </Typography>
              <Typography variant="body1" paragraph>
                We partner with leading shingle, metal, and flat-roof
                manufacturers to offer a tailored solution for every home,
                ensuring the perfect balance of performance, style, and value.
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

        {/* — REST OF YOUR SECTIONS — */}
        {SECTIONS.filter((sec) => sec.id !== 'custom-installation').map(
          (sec) => (
            <Box
              key={sec.id}
              id={sec.id}
              component="section"
              sx={{ py: 4, scrollMarginTop: '80px' }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                }}
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
          )
        )}
      </Container>
    </>
  );
}
