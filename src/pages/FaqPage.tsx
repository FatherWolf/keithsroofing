// src/pages/FaqPage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from '@mui/material';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'podcast';
}

export default function FaqPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'media'),
      (snap) => {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as DocumentData),
        })) as MediaItem[];
        setMedia(items);
      },
      (err) => setError(err.message)
    );
    return () => unsub();
  }, []);

  const images = media.filter((m) => m.type === 'image');
  const podcasts = media.filter((m) => m.type === 'podcast');

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio & Podcasts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* IMAGES GRID */}
      {images.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            mb: 6,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {images.map((img) => (
            <Card key={img.id} sx={{ boxShadow: 1 }}>
              <CardMedia
                component="img"
                src={img.url}
                alt={img.name}
                sx={{ height: 200, objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => window.open(img.url, '_blank')}
              />
              <CardContent>
                <Typography variant="caption" noWrap>
                  {img.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No portfolio images to display yet.</Typography>
      )}

      {/* PODCASTS */}
      {podcasts.length > 0 ? (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Recent Podcasts
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {podcasts.map((p) => (
              <Box
                key={p.id}
                component="audio"
                controls
                src={p.url}
                sx={{ width: '100%' }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Typography>No podcasts published yet.</Typography>
      )}
    </Container>
  );
}
