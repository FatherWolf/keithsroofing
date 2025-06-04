// src/pages/LocationPage.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Seo } from '../components/Seo';
import locationHero from '../images/locationimg.jpeg';
import officeImage from '../images/office.jpeg'; // ← your office photo

const CENTER = {
  lat: 34.63088918301079,
  lng: -93.05804221042523,
};

export default function LocationPage() {
  const theme = useTheme();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  return (
    <>
      <Seo
        title="Keith’s Roofing – Hot Springs, AR Location"
        description="Keith’s Roofing showroom, conveniently adjacent to the Walmart Supercenter on East Grand Avenue in Hot Springs, Arkansas. Visit us for premium roofing solutions."
      />

      {/* Hero + Office Images */}
      <Container component="section" sx={{ py: 2 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          Come Visit Us!
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          <Box
            component="img"
            src={locationHero}
            alt="Showroom Exterior"
            sx={{
              width: '100%',
              height: { xs: 200, md: 300 },
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Box
            component="img"
            src={officeImage}
            alt="Our Office Interior"
            sx={{
              width: '100%',
              height: { xs: 200, md: 300 },
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Box>
      </Container>

      {/* Map + Address */}
      <Container component="section" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          {/* Map */}
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              height: { xs: 240, md: 400 },
            }}
          >
            {!isLoaded && !loadError && (
              <Typography sx={{ p: 2 }}>Loading map…</Typography>
            )}
            {loadError && (
              <Typography color="error" sx={{ p: 2 }}>
                Map failed to load
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
          </Box>

          {/* Info */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Visit Our Hot Springs Showroom
            </Typography>
            <Typography variant="body1" paragraph>
              We’re located at 3560 N Hwy 7 B, right next to the Walmart
              Supercenter in Hot Springs, Arkansas. Stop by to explore our
              luxury roofing materials and discuss your project with our
              experts.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              href={`https://www.google.com/maps/dir/?api=1&destination=${CENTER.lat},${CENTER.lng}`}
              target="_blank"
              rel="noopener"
            >
              Get Directions
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
