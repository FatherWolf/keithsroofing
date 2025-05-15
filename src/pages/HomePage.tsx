// src/pages/HomePage.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';
import img1 from '../images/ProjectGal1.jpeg';
import img2 from '../images/ProjectGal2.jpeg';
import img3 from '../images/ProjectGal3.jpeg';
import img4 from '../images/ProjectGal4.jpeg';
import img5 from '../images/ProjectGal5.jpeg';

export default function HomePage() {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const galleryImages = [img1, img2, img3, img4, img5];

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
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark}CC 0%, ${theme.palette.primary.main}CC 100%), url(https://via.placeholder.com/1800x900)`,
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
                md: 'repeat(5, 1fr)',
              },
            }}
          >
            {galleryImages.map((src, i) => (
              <Box
                component="img"
                src={src}
                key={i}
                alt={`Project ${i + 1}`}
                loading="lazy"
                onClick={() => setSelectedImage(src)}
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Lightbox Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={selectedImage || ''}
            alt=""
            sx={{ width: '100%' }}
          />
        </DialogContent>
      </Dialog>

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
