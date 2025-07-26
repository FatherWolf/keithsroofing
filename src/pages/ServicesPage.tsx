// src/pages/ServicesPage.tsx
import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Divider, Chip } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Seo } from '../components/Seo';
import { StructuredData, servicesStructuredData } from '../components/StructuredData';
import FinancingModule from '../components/FinancingModule';
import { Link as RouterLink } from 'react-router-dom';
import customInstallImg from '../images/IMG_4332.jpeg';
import restorationBeforeImg from '../images/before.jpg';
import restorationAfterImg from '../images/after.jpg';

const MotionBox = styled(motion.div)<{ sx?: any }>(() => ({}));
const MotionCard = styled(motion.div)<{ sx?: any }>(() => ({}));

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServicesPage() {
  const theme = useTheme();

  return (
    <>
      <Seo
        title="Roofing Services Arkansas | Keith's Roofing - Installation, Repair, Inspection"
        description="Professional roofing services in Arkansas: custom installations, storm damage repairs, annual inspections. Licensed roofing contractor serving Central Arkansas."
      />
      <StructuredData data={servicesStructuredData} />

      {/* HERO SECTION */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <MotionBox {...fadeUp} sx={{ textAlign: 'center', mb: 8 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Premium Roofing Services
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Exceptional craftsmanship and attention to detail for discerning homeowners who demand the finest quality.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 6 }}>
              <Chip
                label="Licensed & Insured"
                sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600, px: 2 }}
              />
              <Chip
                label="20+ Years Experience"
                sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 600, px: 2 }}
              />
              <Chip
                label="Premium Materials"
                sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 600, px: 2 }}
              />
            </Box>

            {/* Navigation */}
            <Box
              component="nav"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              <Button 
                href="#custom-installation" 
                variant="outlined"
                size="large"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3
                }}
              >
                Custom Installation
              </Button>
              <Button 
                href="#restorations-repairs" 
                variant="outlined"
                size="large"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3
                }}
              >
                Restorations & Repairs
              </Button>
              <Button 
                href="#annual-inspections" 
                variant="outlined"
                size="large"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3
                }}
              >
                Annual Inspections
              </Button>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* FINANCING SECTION */}
        <MotionBox {...fadeUp} sx={{ mb: 10 }} style={{ marginBottom: '80px' }}>
          <Card
            sx={{
              bgcolor: theme.palette.background.paper,
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}
            >
              Flexible Financing Options
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 4
              }}
            >
              Invest in your home's future with convenient financing solutions. 
              Get instant approval with competitive rates and flexible payment terms 
              designed for quality home improvements.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FinancingModule />
            </Box>
          </Card>
        </MotionBox>

        {/* CUSTOM INSTALLATION */}
        <MotionCard 
          {...fadeUp}
          id="custom-installation"
          style={{ scrollMarginTop: '100px', marginBottom: '80px' }}
        >
          <Card
            sx={{
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                minHeight: { lg: '500px' }
              }}
            >
              <Box
                component="img"
                src={customInstallImg}
                alt="Professional custom roof installation by Keith's Roofing Arkansas"
                loading="lazy"
                sx={{ 
                  width: '100%', 
                  height: { xs: '300px', lg: '100%' },
                  objectFit: 'cover'
                }}
              />
              
              <CardContent sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 3 }}
                >
                  Custom Installation
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: theme.palette.text.secondary, mb: 2 }}
                >
                  Transform your home with a bespoke roofing solution that reflects your refined taste. 
                  Our master craftsmen deliver precision installations using only the finest materials.
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: theme.palette.text.secondary, mb: 4 }}
                >
                  From architectural shingles to premium metal systems, we collaborate with you 
                  to create a roof that enhances your home's character and value.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/roof-colors"
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      bgcolor: theme.palette.secondary.main,
                      '&:hover': { bgcolor: theme.palette.secondary.dark },
                    }}
                  >
                    Explore Premium Colors
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 3
                    }}
                  >
                    Request Consultation
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </MotionCard>

        {/* RESTORATIONS & REPAIRS */}
        <MotionCard 
          {...fadeUp}
          id="restorations-repairs"
          style={{ scrollMarginTop: '100px', marginBottom: '80px' }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 4, textAlign: 'center' }}
              >
                Restorations & Repairs
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7, 
                  color: theme.palette.text.secondary, 
                  mb: 6,
                  textAlign: 'center',
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Restore your home's elegance with meticulous repair work that maintains 
                architectural integrity while enhancing protection and curb appeal.
              </Typography>

              {/* Before & After Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 4,
                  mb: 6,
                }}
              >
                <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                  <Box
                    component="img"
                    src={restorationBeforeImg}
                    alt="Before roof restoration - damaged roof needing repair by Keith's Roofing"
                    loading="lazy"
                    sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    Before
                  </Box>
                </Box>
                <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                  <Box
                    component="img"
                    src={restorationAfterImg}
                    alt="After roof restoration - completed repair by Keith's Roofing Arkansas"
                    loading="lazy"
                    sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'success.main',
                      color: '#fff',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    After
                  </Box>
                </Box>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                  }}
                >
                  Schedule Assessment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </MotionCard>

        {/* ANNUAL INSPECTIONS */}
        <MotionCard 
          {...fadeUp}
          id="annual-inspections"
          style={{ scrollMarginTop: '100px', marginBottom: '80px' }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 3 }}
              >
                Preventive Care Program
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.7, 
                  color: theme.palette.text.secondary, 
                  mb: 4,
                  maxWidth: '700px',
                  mx: 'auto'
                }}
              >
                Protect your investment with our comprehensive annual inspection service. 
                Our detailed 10-point assessment identifies potential issues before they become 
                costly problems, ensuring your roof maintains its beauty and performance.
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 3, 
                flexWrap: 'wrap',
                mb: 4
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>10</Typography>
                  <Typography variant="body2" color="text.secondary">Point Inspection</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: '60px' }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>FREE</Typography>
                  <Typography variant="body2" color="text.secondary">No Cost Assessment</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: '60px' }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>24HR</Typography>
                  <Typography variant="body2" color="text.secondary">Detailed Report</Typography>
                </Box>
              </Box>
              
              <Button
                component={RouterLink}
                to="/contact"
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 6,
                  py: 2,
                  borderRadius: 3,
                  bgcolor: theme.palette.success.main,
                  '&:hover': { bgcolor: theme.palette.success.dark },
                }}
              >
                Schedule Free Inspection
              </Button>
            </CardContent>
          </Card>
        </MotionCard>
      </Container>
    </>
  );
}