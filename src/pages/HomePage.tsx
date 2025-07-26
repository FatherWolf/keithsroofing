// src/pages/HomePage.tsx
import React, { useState, useEffect, Suspense } from 'react';
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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, MotionProps } from 'framer-motion';
import { Seo } from '../components/Seo';
import { StructuredData, businessStructuredData } from '../components/StructuredData';
import { Link as RouterLink } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import heroImage from '../images/bannerimg.webp';
import promoVideo from '../images/Advideo.mp4';
import customInstall from '../images/CustonInstall.jpeg';
import restoration from '../images/Restoration.jpeg';
import annualInspection from '../images/AnnualInspection.jpeg';

const GoogleReviews = React.lazy(() => import('../components/GoogleReview'));
const CertScroll = React.lazy(() => import('../components/CertScroll'));

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

interface GalleryImage {
  id: string;
  url: string;
  description?: string;
  name: string;
}

export default function HomePage() {
  const theme = useTheme();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const services = [
    {
      title: 'Custom Installations',
      img: customInstall,
      to: '/services#custom-installation',
    },
    {
      title: 'Restorations & Repairs',
      img: restoration,
      to: '/services#restorations-repairs',
    },
    {
      title: 'Annual Inspections',
      img: annualInspection,
      to: '/services#annual-inspections',
    },
  ];

  // Fetch gallery images from Firebase
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const q = query(
          collection(db, 'media'),
          where('type', '==', 'image'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const images: GalleryImage[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          url: doc.data().url,
          description: doc.data().description,
          name: doc.data().name
        }));
        setGalleryImages(images);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to static images if Firebase fails
        setGalleryImages([
          { id: '1', url: require('../images/ProjectGal1.jpeg'), name: 'Project 1', description: 'Roofing project showcase' },
          { id: '2', url: require('../images/ProjectGal2.jpeg'), name: 'Project 2', description: 'Quality workmanship' },
          { id: '3', url: require('../images/ProjectGal3.jpeg'), name: 'Project 3', description: 'Professional installation' },
          { id: '4', url: require('../images/ProjectGal4.jpeg'), name: 'Project 4', description: 'Expert craftsmanship' },
          { id: '5', url: require('../images/ProjectGal5.jpeg'), name: 'Project 5', description: 'Satisfied customers' },
        ]);
      }
    };
    
    fetchGalleryImages();
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Seo
        title="Keith's Roofing Arkansas | Premium Roofing Solutions & Installation"
        description="Expert roofing contractor in Arkansas. Custom installations, repairs, inspections. Licensed, insured roofing company serving Central Arkansas with quality workmanship."
      />
      <StructuredData data={businessStructuredData} />

      {/* HERO */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: '120%',
          backgroundPosition: 'center 30%',
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
            Keith's Roofing Arkansas
          </Typography>
          <Typography variant="h5" gutterBottom>
            Premium Roofing Solutions for Arkansas Homeowners
          </Typography>
          <Button
            component={RouterLink}
            to="/contact"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.secondary.main,
              color: '#fff',
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
              variant="h2"
              component="h2"
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
              <Typography variant="h3" component="h3" sx={{ fontWeight: 600 }}>
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
                At Keith’s Roofing, we pride ourselves on being the go-to
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
                Why Choose Keith’s Roofing?
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
                  <CardActionArea component={RouterLink} to={svc.to}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={svc.img}
                      alt={`${svc.title} - Professional roofing services by Keith's Roofing Arkansas`}
                      loading="lazy"
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
      {/* TRUST THE EXPERTS */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ bgcolor: theme.palette.background.default, py: 8 }}
      >
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          ></Typography>

          {/* Logo row: horizontal scroll on xs, centered wrap on md+ */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              py: 2,

              // mobile: allow horizontal scroll
              overflowX: { xs: 'auto', md: 'visible' },
              WebkitOverflowScrolling: 'touch',
              // align items start on mobile, center on desktop
              justifyContent: { xs: 'flex-start', md: 'center' },
              // disable wrapping on mobile so scroll kicks in
              flexWrap: { xs: 'nowrap', md: 'wrap' },
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <CertScroll />
            </Suspense>
          </Box>
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
            {galleryImages.map((image, i) => (
              <Box key={image.id} sx={{ position: 'relative' }}>
                <MotionImg
                  src={image.url}
                  alt={`${image.description || image.name} - Roofing project by Keith's Roofing Arkansas`}
                  loading="lazy"
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
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease'
                    }
                  }}
                  onClick={() => handleImageClick(image)}
                />
                {image.description && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 1,
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                      {image.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </MotionBox>

      {/* Image Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedImage?.description || selectedImage?.name || 'Project Image'}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.description || selectedImage.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* GOOGLE REVIEWS */}
      <MotionBox
        as="section"
        {...fadeUp}
        sx={{ 
          bgcolor: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            opacity: 0.05,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat'
          }}
        />
        
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <MotionBox {...fadeUp} sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: '#faf9f6',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              What Our Clients Say
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                color: theme.palette.grey[300],
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Don't just take our word for it. Here's what Arkansas homeowners say about our roofing services.
            </Typography>
          </MotionBox>

          {/* Reviews Container */}
          <MotionBox
            {...fadeUp}
            transition={{ delay: 0.2 }}
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '30px',
                background: 'linear-gradient(to right, rgba(30,41,59,1), rgba(30,41,59,0))',
                zIndex: 2,
                pointerEvents: 'none'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '30px',
                background: 'linear-gradient(to left, rgba(30,41,59,1), rgba(30,41,59,0))',
                zIndex: 2,
                pointerEvents: 'none'
              }
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                overflowX: 'auto', 
                gap: 3, 
                py: 3,
                px: 4,
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  height: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.secondary.main,
                  borderRadius: '4px',
                  '&:hover': {
                    background: theme.palette.secondary.dark
                  }
                }
              }}
            >
              <Suspense 
                fallback={
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      minHeight: '200px',
                      width: '100%',
                      color: theme.palette.grey[300]
                    }}
                  >
                    <Typography variant="body1">Loading customer reviews...</Typography>
                  </Box>
                }
              >
                <GoogleReviews
                  placeId={process.env.REACT_APP_GOOGLE_PLACE_ID || ''}
                  apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
                  maxReviews={10}
                />
              </Suspense>
            </Box>
          </MotionBox>

          {/* Trust Indicators */}
          <MotionBox
            {...fadeUp}
            transition={{ delay: 0.4 }}
            sx={{ 
              textAlign: 'center', 
              mt: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}>
                4.8
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ color: '#faf9f6', fontWeight: 600 }}>
                  Average Rating
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.grey[400] }}>
                  Google Reviews
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ height: '40px', width: '1px', bgcolor: theme.palette.grey[600] }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}>
                150+
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ color: '#faf9f6', fontWeight: 600 }}>
                  Happy Customers
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.grey[400] }}>
                  And Counting
                </Typography>
              </Box>
            </Box>
          </MotionBox>
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
            color: '#fff',
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
