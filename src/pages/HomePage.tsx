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

// ← your real hero image here:
import heroImage from '../images/IMG_1670.jpeg';

export default function HomePage() {
  const theme = useTheme();
  const jsonLd = {
    /* same as before */
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

  const galleryImages = [
    require('../images/ProjectGal1.jpeg'),
    require('../images/ProjectGal2.jpeg'),
    require('../images/ProjectGal3.jpeg'),
    require('../images/ProjectGal4.jpeg'),
    require('../images/ProjectGal5.jpeg'),
  ];

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Top-tier roofing for discerning clients. Get your free estimate now."
      />
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero Image Slot */}
      <Box
        component="section"
        aria-label="Hero"
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '75vh' },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          px: 2,
        }}
      >
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(102,7,8,0.8) 0%, rgba(186,24,27,0.8) 100%)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Keith’s Roofing
          </Typography>
          <Typography variant="h4" component="h2" mb={4}>
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
      </Box>

      {/* Services on soft white */}
      <Box
        component="section"
        sx={{ bgcolor: theme.palette.background.paper, py: 8 }}
      >
        <Container>
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
              <Card key={svc.title} elevation={4}>
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
                    Expert craftsmanship tailored to the most exacting
                    standards.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Gallery on light grey */}
      <Box component="section" sx={{ bgcolor: theme.palette.grey[100], py: 8 }}>
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
                md: 'repeat(5, 1fr)',
              },
            }}
          >
            {galleryImages.map((src, i) => (
              <Box
                key={i}
                component="img"
                src={src}
                alt={`Project ${i + 1}`}
                loading="lazy"
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: 1,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials on soft white */}
      <Box
        component="section"
        sx={{ bgcolor: theme.palette.background.paper, py: 8 }}
      >
        <Container>
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
                  src={`https://via.placeholder.com/72?text=Client+${i}`}
                  alt={`Client ${i}`}
                  sx={{ width: 72, height: 72, mx: 'auto', mb: 2 }}
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
      </Box>

      {/* Final CTA on primary red */}
      <Box
        component="section"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: '#fff',
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
