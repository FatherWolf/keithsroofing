// src/pages/LocationPage.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '60vh',
};

const CENTER = {
  lat: 34.63088918301079, // ← replace with your business latitude
  lng: -93.05804221042523, // ← replace with your business longitude
};

export default function LocationPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError)
    return <Typography color="error">Map failed to load</Typography>;
  if (!isLoaded) return <Typography>Loading map…</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Location
      </Typography>
      <Box sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={CENTER}
          zoom={15}
        >
          <Marker position={CENTER} />
        </GoogleMap>
      </Box>
    </Container>
  );
}
