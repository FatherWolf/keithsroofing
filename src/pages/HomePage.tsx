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
import GoogleReviews from '../components/GoogleReview';
import CertScroll from '../components/CertScroll';
import heroImage from '../images/IMG_1670.jpeg';
import promoVideo from '../images/Advideo.mp4';
import { motion } from 'framer-motion';

export default function HomePage() {
  // Define our “rich” palette
  const navy = '#0B1D3A';
  const gold = '#B89B4D';
  const offWhite = '#FAF9F6';

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
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <>
      <Seo
        title="Keith's Roofing | Premium Roofing Solutions"
        description="Top‐tier roofing for discerning clients."
      />

      {/* HERO */}
      <Box
        component="section"
        sx={{
          position: 'relative',
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
            background: `linear-gradient(135deg, ${navy}CC 0%, ${navy}99 100%)`,
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
            color: '#FFF',
            textAlign: 'center',
            padding: '0 16px',
          }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Keith’s Roofing
          </Typography>
          <Typography variant="h5" gutterBottom>
            Luxury Roofing Solutions for Discerning Clients
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: gold,
              color: navy,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#A88A42' },
            }}
            href="/contact"
          >
            Request Your Free Estimate
          </Button>
        </motion.div>
      </Box>

      {/* VIDEO */}
      <Box component="section" sx={{ bgcolor: offWhite, py: 8 }}>
        <Container>
          <motion.div {...fadeUp}>
            <Typography variant="h3" align="center" gutterBottom>
              Who We Are
            </Typography>
            <Box
              component="video"
              controls
              src={promoVideo}
              sx={{
                width: '100%',
                maxWidth: 800,
                border: `4px solid ${gold}`,
                borderRadius: 2,
                display: 'block',
                mx: 'auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
            />
          </motion.div>
        </Container>
      </Box>

      {/* SERVICES */}
      <Box component="section" sx={{ bgcolor: '#FFF', py: 8 }}>
        <Container>
          <motion.div {...fadeUp}>
            <Typography variant="h3" align="center" gutterBottom>
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
                md: 'repeat(4,1fr)',
              },
            }}
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    border: `1px solid ${offWhite}`,
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
                    <Typography variant="h6">{svc.title}</Typography>
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
      </Box>

      {/* CERTIFICATIONS */}
      <Box component="section" sx={{ bgcolor: offWhite, py: 8 }}>
        <Container>
          <motion.div {...fadeUp}>
            <CertScroll />
          </motion.div>
        </Container>
      </Box>

      {/* GALLERY */}
      <Box component="section" sx={{ bgcolor: '#FFF', py: 8 }}>
        <Container>
          <motion.div {...fadeUp}>
            <Typography variant="h3" align="center" gutterBottom>
              Project Gallery
            </Typography>
          </motion.div>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              mt: 2,
              gridTemplateColumns: {
                xs: 'repeat(2,1fr)',
                sm: 'repeat(3,1fr)',
                md: 'repeat(5,1fr)',
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
                viewport={{ once: true }}
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
      </Box>

      {/* REVIEWS */}
      <Box component="section" sx={{ bgcolor: offWhite, py: 8 }}>
        <Container>
          <motion.div {...fadeUp}>
            <GoogleReviews
              placeId={process.env.REACT_APP_GOOGLE_PLACE_ID!}
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
              maxReviews={5}
            />
          </motion.div>
        </Container>
      </Box>

      {/* FINAL CTA */}
      <Box
        component="section"
        sx={{ bgcolor: navy, color: '#FFF', py: 8, textAlign: 'center' }}
      >
        <Container>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" gutterBottom>
              Ready to Elevate Your Property?
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: gold,
                color: navy,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { bgcolor: '#A88A42' },
              }}
              href="/contact"
            >
              Schedule Your Consultation
            </Button>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
