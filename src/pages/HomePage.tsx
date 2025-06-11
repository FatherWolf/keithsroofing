// src/pages/HomePage.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Seo } from '../components/Seo';
import GoogleReviews from '../components/GoogleReview';
import CertScroll from '../components/CertScroll';
import heroImage from '../images/IMG_1670.jpeg';
import promoVideo from '../images/Advideo.mp4';
import { motion } from 'framer-motion';

export default function HomePage() {
  // Your accent colors:
  const accentRed = '#E5383B';
  const cardBg = '#FAF9F6'; // very light for cards
  const textDark = '#161A1D';

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

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Top-tier roofing for discerning clients."
      />

      {/* HERO (full-bleed, dark overlay) */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
          height: { xs: '60vh', md: '75vh' },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(22,26,29,0.75)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 16px',
            color: '#faf9f6',
          }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Keith’s Roofing
          </Typography>
          <Typography variant="h5" gutterBottom>
            Premium Roofing Solutions for Discerning Clients
          </Typography>
          <Button
            variant="contained"
            href="/contact"
            sx={{
              mt: 2,
              bgcolor: accentRed,
              color: '#fff',
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#C1272D' },
            }}
          >
            Request a Free Estimate
          </Button>
        </motion.div>
      </Box>

      {/* WHO WE ARE VIDEO */}
      <Container component="section" sx={{ py: 8 }}>
        <motion.div {...fadeUp}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#faf9f6' }}
          >
            Who We Are
          </Typography>
        </motion.div>
        <motion.div {...fadeUp}>
          <Box
            component="video"
            controls
            src={promoVideo}
            sx={{
              display: 'block',
              mx: 'auto',
              width: '100%',
              maxWidth: 800,
              border: `4px solid ${accentRed}`,
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          />
        </motion.div>
      </Container>

      {/* SERVICES */}
      <Container component="section" sx={{ py: 8 }}>
        <motion.div {...fadeUp}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#faf9f6' }}
          >
            Our Premium Services
          </Typography>
        </motion.div>
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
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              {...fadeUp}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card
                elevation={2}
                sx={{
                  backgroundColor: cardBg,
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={svc.img}
                  alt={svc.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: textDark }}>
                    {svc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expert craftsmanship tailored to the most exacting
                    standards.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* CERTIFICATIONS */}
      <Container component="section" sx={{ py: 8 }}>
        <motion.div {...fadeUp}>
          <CertScroll />
        </motion.div>
      </Container>

      {/* GALLERY */}
      <Container component="section" sx={{ py: 8 }}>
        <motion.div {...fadeUp}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#faf9f6' }}
          >
            Project Gallery
          </Typography>
        </motion.div>
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
            <motion.img
              key={i}
              src={src}
              alt={`Project ${i + 1}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                borderRadius: 8,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
              onClick={() => window.open(src, '_blank')}
            />
          ))}
        </Box>
      </Container>

      {/* GOOGLE REVIEWS */}
      <Container component="section" sx={{ py: 8 }}>
        <motion.div {...fadeUp}>
          <GoogleReviews
            placeId={process.env.REACT_APP_GOOGLE_PLACE_ID!}
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
            maxReviews={5}
          />
        </motion.div>
      </Container>

      {/* FINAL CTA */}
      <Box component="section" sx={{ py: 8, textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <Typography variant="h4" gutterBottom sx={{ color: '#faf9f6' }}>
            Ready to Elevate Your Property?
          </Typography>
          <Button
            variant="contained"
            href="/contact"
            sx={{
              mt: 2,
              bgcolor: accentRed,
              color: '#fff',
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#C1272D' },
            }}
          >
            Schedule Your Consultation
          </Button>
        </motion.div>
      </Box>
    </>
  );
}
