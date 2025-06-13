// src/pages/LocationPage.tsx
import React, { useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { Seo } from '../components/Seo';
import locationHero from '../images/KeithandTruck.jpeg';
import officeImage from '../images/office.jpeg';

const CENTER = { lat: 34.63088918301079, lng: -93.05804221042523 };

export default function LocationPage() {
  const theme = useTheme();

  // Load only the "places" library
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  // Autocomplete refs & callbacks
  const autoRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoadAuto = useCallback((auto: google.maps.places.Autocomplete) => {
    autoRef.current = auto;
  }, []);
  const onPlaceChanged = useCallback(() => {
    const place = autoRef.current?.getPlace();
    if (place?.geometry?.location) {
      // e.g. pan the map: mapRef.current?.panTo(place.geometry.location)
    }
  }, []);

  // Custom palette
  const darkCharcoal = '#161A1D';
  const offWhite = '#F5F3F4';
  const cardBg = '#FFFFFF';

  return (
    <>
      <Seo
        title="Keith’s Roofing – Hot Springs, AR Location"
        description="Visit our showroom next to the Walmart Supercenter on Highway 7 in Hot Springs, Arkansas. Discover premium roofing craftsmanship firsthand."
      />

      {/* Hero Banner */}
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
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(22,26,29,0.6)',
          }}
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
            Come Visit Our Showroom
          </Typography>
        </Container>
      </Box>

      {/* Map + Autocomplete + Address */}
      <Box component="section" sx={{ bgcolor: offWhite, py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: darkCharcoal, fontWeight: 600 }}
          >
            Find Us & Search Nearby
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              mt: 4,
            }}
          >
            {/* Map Card */}
            <Card
              sx={{
                bgcolor: cardBg,
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                height: { xs: 240, md: 400 },
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

            {/* Autocomplete + Address Card */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Autocomplete onLoad={onLoadAuto} onPlaceChanged={onPlaceChanged}>
                <TextField
                  label="Search for nearby places"
                  variant="outlined"
                  fullWidth
                />
              </Autocomplete>

              <Card
                sx={{
                  bgcolor: cardBg,
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: darkCharcoal, fontWeight: 600 }}
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
                    size="large"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${CENTER.lat},${CENTER.lng}`}
                    target="_blank"
                    sx={{
                      bgcolor: theme.palette.error.main,
                      color: '#fff',
                      textTransform: 'none',
                    }}
                  >
                    Get Directions
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
            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="250"
                image={locationHero}
                alt="Showroom Exterior"
              />
            </Card>
            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="250"
                image={officeImage}
                alt="Showroom Interior"
              />
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}
