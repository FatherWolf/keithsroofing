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
import GoogleReviews from '../components/GoogleReview';
import promoVideo from '../images/Advideo.mp4';
import CertScroll from '../components/CertScroll';

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

      <Box
        component="section"
        aria-label="Hero"
        sx={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          ml: '-50vw',
          height: { xs: '60vh', md: '75vh' },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          px: 2,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(102,7,8,0.8) 0%, rgba(186,24,27,0.8) 100%)',
            zIndex: 1,
          }}
        />
        {/* Hero text/button */}
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <Typography variant="h1" gutterBottom>
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

      {/* Promotional Video Section */}
      <Box
        component="section"
        aria-label="Promo Video"
        sx={{
          bgcolor: theme.palette.grey[50],
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Who We Are
          </Typography>

          {/* HTML5 video */}
          <Box
            component="video"
            controls
            src={promoVideo} // ← your video file path
            sx={{
              width: '100%',
              maxWidth: 800,
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Container>
      </Box>
      {/* Services Section (now scrolling over the banner) */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          zIndex: 1,
          bgcolor: theme.palette.background.paper,
          py: 8,
        }}
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
      <Box
        component="section"
        sx={{
          bgcolor: theme.palette.grey[100],
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container>
          <CertScroll />
        </Container>
      </Box>

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
        <GoogleReviews
          placeId={process.env.REACT_APP_GOOGLE_PLACE_ID!}
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
          maxReviews={5}
        />
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
