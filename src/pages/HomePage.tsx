// src/pages/HomePage.tsx
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import { motion, MotionProps } from 'framer-motion';
import { Seo } from '../components/Seo';
import GoogleReviews from '../components/GoogleReview';
import CertScroll from '../components/CertScroll';

import heroImage from '../images/ProjectGal1.jpeg';
import promoVideo from '../images/Advideo.mp4';
import customInstall from '../images/CustonInstall.jpeg';
import restoration from '../images/Restoration.jpeg';
import annualInspection from '../images/AnnualInspection.jpeg';
import FinancingModule from '../components/FinancingModule';
import { Link as RouterLink } from 'react-router-dom';

// wrap motion.div with MUI styled to get `sx`
const MotionBox = styled(motion.div)({});

// wrap motion.img with MUI styled to get `sx`
const MotionImg = styled(motion.img)({});

const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const theme = useTheme();

  const services = [
    {
      title: 'Custom Installations',
      img: customInstall,
      href: '/services#custominstallations',
    },
    {
      title: 'Restorations & Repairs',
      img: restoration,
      href: '/services#restorationsandrepairs',
    },
    {
      title: 'Annual Inspections',
      img: annualInspection,
      href: '/services#annualinspections',
    },
  ];

  const gallery = [
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
        description="Top-tier roofing for discerning clients."
      />

      {/* HERO */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
          height: { xs: '60vh', md: '75vh' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(22,26,29,0.75)',
          }}
        />
        <MotionBox
          {...fadeUp}
          transition={{ duration: 1 }}
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h1" gutterBottom>
            Keith’s Roofing
          </Typography>
          <Typography variant="h5" gutterBottom>
            Premium Roofing Solutions for Discerning Clients
          </Typography>
          <Button
            component={RouterLink}
            to="/contact"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.secondary.main,
              color: '#fff', // force white text
              '&:hover': { backgroundColor: theme.palette.secondary.dark },
              textTransform: 'none',
            }}
          >
            Request a Free Estimate
          </Button>
        </MotionBox>
      </MotionBox>

      {/* WHO WE ARE + WHY CHOOSE US */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.background.default, py: 8 }}
      >
        <Container>
          <MotionBox {...fadeUp}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Who We Are
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              mt: 4,
            }}
          >
            <MotionBox {...fadeUp}>
              <Box
                component="video"
                controls
                src={promoVideo}
                sx={{
                  width: '100%',
                  maxWidth: 800,
                  border: `4px solid ${theme.palette.secondary.main}`,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </MotionBox>

            <MotionBox
              {...fadeUp}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Why Choose Us To Be Your Roofing Company?
              </Typography>
              <Typography variant="body1">
                Our team has the skills and expertise to tackle most roofing
                installation or repair projects including shingle roofs, wood
                shake roofs, flat roofs, tear-outs and nail-overs, rotten wood,
                hail and storm damage. We provide a free 10-point inspection
                along with a free estimate.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                Your Trusted Arkansas Roofer
              </Typography>
              <Typography variant="body1">
                At Keith's Roofing, we pride ourselves on being the go-to
                Arkansas roofer, serving the heart of Central Arkansas with
                dedication and excellence. We offer Senior (62+) & Military
                discounts—ask about our referral program!
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                Comprehensive Roofing Solutions
              </Typography>
              <Typography variant="body1">
                Whether you need routine maintenance, a full roof replacement,
                or emergency repair, our skilled pros handle it all with
                precision and care.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                Why Choose Keith's Roofing?
              </Typography>
              <Typography variant="body1">
                Choosing us means choosing one of Arkansas’s top roofing
                companies—built on customer satisfaction and exceptional
                workmanship.
              </Typography>
            </MotionBox>
          </Box>
        </Container>
      </MotionBox>

      {/* SERVICES */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.background.default, py: 8 }}
      >
        <Container>
          <MotionBox {...fadeUp}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Our Premium Services
            </Typography>
          </MotionBox>

          <Box
            sx={{
              display: 'grid',
              gap: 4,
              mt: 4,
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: 'repeat(3,1fr)',
              },
            }}
          >
            {services.map((svc, i) => (
              <MotionBox
                key={svc.title}
                {...fadeUp}
                transition={{ delay: i * 0.2 }}
              >
                <Card
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.02)',
                      boxShadow: 3,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea href={svc.href}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={svc.img}
                      alt={svc.title}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {svc.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MotionBox>
            ))}
          </Box>
        </Container>
      </MotionBox>

      {/* CERTIFICATIONS */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.background.default, py: 8 }}
      >
        <Container>
          <CertScroll />
        </Container>
      </MotionBox>

      {/* GALLERY */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.background.default, py: 8 }}
      >
        <Container>
          <MotionBox {...fadeUp}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Project Gallery
            </Typography>
          </MotionBox>
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
            {gallery.map((src, i) => (
              <MotionImg
                key={i}
                src={src}
                alt={`Project ${i + 1}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                }}
                onClick={() => window.open(src, '_blank')}
              />
            ))}
          </Box>
        </Container>
      </MotionBox>

      {/* GOOGLE REVIEWS */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.grey[900], py: 8 }}
      >
        <Container>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: '#faf9f6' }}
          >
            What Our Clients Say
          </Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, p: 2 }}>
            <GoogleReviews
              placeId={process.env.REACT_APP_GOOGLE_PLACE_ID || ''}
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
              maxReviews={10}
            />
          </Box>
        </Container>
      </MotionBox>

      {/* FINAL CTA */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{
          bgcolor: theme.palette.background.paper,
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.palette.text.secondary }}
        >
          Ready to Elevate Your Property?
        </Typography>
        <Button
          component={RouterLink}
          to="/contact"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.secondary.main,
            color: '#fff', // force white text
            '&:hover': { backgroundColor: theme.palette.secondary.dark },
            textTransform: 'none',
          }}
        >
          Schedule Your Consultation
        </Button>
      </MotionBox>
    </>
  );
}
