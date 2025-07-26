// src/pages/LocationPage.tsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Seo } from '../components/Seo';
import locationHero from '../images/KeithandTruck.jpeg';
import officeImage from '../images/office.jpeg';
import locationImage from '../images/locationimg.jpeg';
import { Link as RouterLink } from 'react-router-dom';

const CENTER = { lat: 34.63088918301079, lng: -93.05804221042523 };

export default function LocationPage() {
  const theme = useTheme();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const darkCharcoal = '#161A1D';
  const offWhite = '#F5F3F4';

  return (
    <>
      <Seo
        title="Keith’s Roofing – Hot Springs, AR Location"
        description="Visit our showroom next to the Walmart Supercenter on Highway 7 in Hot Springs, Arkansas. Discover premium roofing craftsmanship firsthand."
      />

      {/* Hero */}
      <Box
        component="section"
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          height: { xs: '40vh', md: '50vh' },
          backgroundImage: `url(${locationHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
        }}
      >
        <Box
          sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)' }}
        />
        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ color: '#faf9f6', fontWeight: 600 }}
          >
            Visit Our Hot Springs Village Showroom
          </Typography>
        </Container>
      </Box>

      {/* Map + Details */}
      <Box component="section" sx={{ bgcolor: offWhite, py: 8 }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {/* Map */}
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                height: { xs: 240, md: '100%' },
              }}
            >
              {!isLoaded && !loadError && (
                <Typography sx={{ p: 2 }}>Loading map…</Typography>
              )}
              {loadError && (
                <Typography sx={{ p: 2 }} color="error">
                  Failed to load map
                </Typography>
              )}
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={CENTER}
                  zoom={15}
                >
                  <Marker position={CENTER} />
                </GoogleMap>
              )}
            </Card>

            {/* Details Column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Address */}
              <Card sx={{ boxShadow: 3, borderRadius: 2, bgcolor: offWhite }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, color: darkCharcoal }}
                  >
                    3560 N Highway 7, Hot Springs, AR
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ color: darkCharcoal }}
                  >
                    Right next to the Walmart Supercenter. Explore premium
                    roofing materials and discuss your project with our experts.
                  </Typography>
                  <Button
                    variant="contained"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${CENTER.lat},${CENTER.lng}`}
                    target="_blank"
                    sx={{
                      bgcolor: theme.palette.error.main,
                      color: '#fff', // force white text
                      textTransform: 'none',
                    }}
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card sx={{ boxShadow: 3, borderRadius: 2, bgcolor: offWhite }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, color: darkCharcoal }}
                  >
                    Contact Us
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ color: darkCharcoal }}
                  >
                    Ready for a free estimate or have a roofing question? Reach
                    out and we’ll get back to you right away.
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    fullWidth
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      color: '#fff', // force white text
                      '&:hover': { bgcolor: theme.palette.secondary.dark },
                      textTransform: 'none',
                    }}
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Showroom Photos */}
      <Box component="section" sx={{ bgcolor: darkCharcoal, py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: '#faf9f6', fontWeight: 600 }}
          >
            Our Showroom
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              mt: 4,
            }}
          >
            {[
              { src: locationImage, alt: 'Showroom Sign' },
              { src: officeImage, alt: 'Showroom Exterior' },
            ].map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img.src}
                alt={img.alt}
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 250, md: 300 },
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
