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
import { Seo } from '../components/Seo';

export default function HomePage() {
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

  const services = ['Installation', 'Repair', 'Custom Design', 'Inspection'];

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Keith's Roofing delivers top-tier roofing installations, repairs, and custom designs for discerning clients. Get a quote today!"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Hero"
        sx={{
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: 'url(https://via.placeholder.com/1600x900)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '0px 2px 4px rgba(0,0,0,0.7)',
          p: 3,
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
        <Typography variant="h2" component="h2" mb={4}>
          Premium Roofing Solutions for Discerning Clients
        </Typography>
        <Button variant="contained" size="large" href="/contact">
          Get a Quote
        </Button>
      </Box>

      {/* About Section */}
      <Container component="section" aria-label="About Us" sx={{ py: 8 }}>
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
            alt="The Keith's Roofing team at work"
            loading="lazy"
            sx={{ width: '100%', borderRadius: 2 }}
          />
          <Box>
            <Typography
              variant="h2"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Why Choose Us?
            </Typography>
            <Typography paragraph>
              At Keith’s Roofing, we combine decades of craftsmanship with
              top-tier materials to deliver roofs that stand the test of
              time—and turn heads doing it.
            </Typography>
            <Button variant="outlined" href="/about">
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Services Section */}
      <Box
        component="section"
        aria-label="Our Services"
        sx={{ bgcolor: 'grey.50', py: 8 }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Our Services
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              mt: 4,
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: 'repeat(4,1fr)',
              },
            }}
          >
            {services.map((service) => (
              <Card elevation={3} key={service}>
                <CardMedia
                  component="img"
                  height="180"
                  image="https://via.placeholder.com/300x180"
                  alt={`${service} service`}
                  loading="lazy"
                />
                <CardContent>
                  <Typography variant="h3" component="h4" gutterBottom>
                    {service}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    High-quality {service.toLowerCase()} with unparalleled
                    craftsmanship.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container component="section" aria-label="Testimonials" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Testimonials
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            mt: 4,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box textAlign="center" px={2} key={i}>
              <Avatar
                src={`https://via.placeholder.com/100?text=Client+${i}`}
                alt={`Client ${i} headshot`}
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
              />
              <Typography variant="body1" gutterBottom>
                “Outstanding service from start to finish. Our new roof looks
                incredible!”
              </Typography>
              <Typography variant="subtitle1">— Client {i}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Final CTA */}
      <Box
        component="section"
        aria-label="Call to Action"
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          py: 6,
          textAlign: 'center',
          textShadow: '0px 1px 3px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="h2" component="h3" gutterBottom>
          Ready to Elevate Your Roof?
        </Typography>
        <Button variant="contained" size="large" href="/contact">
          Contact Our Experts
        </Button>
      </Box>
    </>
  );
}
