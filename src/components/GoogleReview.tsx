// src/components/GoogleReviews.tsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useTheme } from '@mui/material/styles';

declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

interface Props {
  placeId: string;
  apiKey: string;
  maxReviews?: number;
}

export default function GoogleReviews({
  placeId,
  apiKey,
  maxReviews = 5,
}: Props) {
  const theme = useTheme();
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the Maps JS API if needed
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = fetchReviews;
      script.onerror = () => {
        setError(false as unknown as string | null);
        setLoading(false);
      };
      document.head.appendChild(script);
    } else {
      fetchReviews();
    }

    function fetchReviews() {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );
      service.getDetails(
        { placeId, fields: ['reviews'] },
        (place: any, status: string) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place.reviews
          ) {
            setReviews(place.reviews.slice(0, maxReviews));
          } else {
            setError('Could not load reviews');
          }
          setLoading(false);
        }
      );
    }
  }, [apiKey, placeId, maxReviews]);

  if (loading) return <Typography>Loading reviews…</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!reviews.length) return <Typography>No reviews available.</Typography>;

  return (
    <Box
      component="section"
      aria-labelledby="reviews-heading"
      sx={{ py: 8, bgcolor: theme.palette.background.paper }}
    >
      {/* Scrollable container */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: 2,
          p: 2,
        }}
      >
        {reviews.map((r, i) => (
          <Box
            key={i}
            sx={{
              flex: '0 0 300px',
              scrollSnapAlign: 'start',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              transition: 'transform .2s',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar src={r.profile_photo_url} sx={{ mr: 1 }} />
              <Typography variant="subtitle1">{r.author_name}</Typography>
            </Box>
            <Rating value={r.rating} readOnly size="small" sx={{ mb: 1 }} />
            <Typography variant="body2" paragraph sx={{ minHeight: 60 }}>
              {r.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {r.relative_time_description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
