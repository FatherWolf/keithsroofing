// src/pages/HomePage.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';

export default function HomePage() {
  const theme = useTheme();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: "Keith's Roofing",
    url: 'https://keithsroofing.com',
    logo: 'https://keithsroofing.com/logo.png',
    description: 'Premium roofing solutions for discerning clients.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Luxury Ave',
      addressLocality: 'Rooftown',
      addressRegion: 'RT',
      postalCode: '12345',
      addressCountry: 'US',
    },
  };
  const services = [
    {
      title: 'Custom Installations',
      img: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Restorations & Repairs',
      img: 'https://via.placeholder.com/300x200',
    },
    { title: 'Luxury Materials', img: 'https://via.placeholder.com/300x200' },
    { title: 'Annual Inspections', img: 'https://via.placeholder.com/300x200' },
  ];

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Top-tier roofing for discerning clients. Get your free estimate now."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Hero"
        sx={{
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: `
          linear-gradient(135deg, ${theme.palette.primary.dark}CC 0%, ${theme.palette.primary.main}CC 100%),
          url(https://via.placeholder.com/1800x900)
        `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          p: 4,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Keith’s Roofing
        </Typography>
        <Typography variant="h4" component="h2" mb={4} sx={{ maxWidth: 600 }}>
          Luxury Roofing Solutions Crafted for Excellence and Durability
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/contact"
        >
          Request a Free Estimate
        </Button>
      </Box>

      {/* Services Section */}
      <Container component="section" aria-label="Our Services" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Our Premium Services
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            mt: 4,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {services.map((svc) => (
            <Card elevation={4} key={svc.title}>
              <CardMedia
                component="img"
                height="180"
                image={svc.img}
                alt={svc.title}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {svc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expert craftsmanship tailored to the most exacting standards.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Gallery Section */}
      <Box
        component="section"
        aria-label="Gallery"
        sx={{ bgcolor: 'grey.100', py: 8 }}
      >
        <Container>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Project Gallery
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              mt: 2,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(6, 1fr)',
              },
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <CardMedia
                component="img"
                key={i}
                image={`https://via.placeholder.com/200?text=Project+${i + 1}`}
                alt={`Project ${i + 1}`}
                loading="lazy"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container component="section" aria-label="Testimonials" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          What Our Clients Say
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            mt: 4,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box key={i} textAlign="center" p={2}>
              <Avatar
                sx={{ width: 72, height: 72, mx: 'auto', mb: 2 }}
                src={`https://via.placeholder.com/72?text=Client+${i}`}
                alt={`Client ${i}`}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontStyle: 'italic' }}
              >
                “Keith’s Roofing delivered exceptional quality and service.
                Highly recommended!”
              </Typography>
              <Typography variant="subtitle2">— Client {i}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final CTA */}
      <Box
        component="section"
        aria-label="Call to Action"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Elevate Your Property?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/contact"
        >
          Schedule Your Consultation
        </Button>
      </Box>
    </>
  );
}
