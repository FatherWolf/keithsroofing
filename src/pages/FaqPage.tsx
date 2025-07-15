// src/pages/FaqPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

interface PodcastItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'podcast';
}

// 1) YOUR STATIC FAQ LIST
const STATIC_FAQS = [
  {
    question: 'What types of roofs do you install?',
    answer:
      'We install asphalt shingles, metal roofing, and flat roofs—tailored to your home’s needs.',
  },
  {
    question: 'How do I know if my roof needs repair?',
    answer:
      'Look for missing or curled shingles, water stains on your ceiling, or granules in your gutters. We also offer a free 10-point inspection.',
  },
  {
    question: 'Do you handle insurance claims?',
    answer:
      'Yes—we’ll document damage, provide detailed estimates, and work directly with your insurance company to simplify the process.',
  },
];

export default function FaqPage() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'media'), (snap) => {
      const all = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as PodcastItem[];
      setPodcasts(all.filter((m) => m.type === 'podcast'));
    });
    return () => unsub();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {/* STATIC FAQs */}
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {STATIC_FAQS.map((f, i) => (
          <Box key={i} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
            <Typography variant="h6">{f.question}</Typography>
            <Typography variant="body2" paragraph>
              {f.answer}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* DYNAMIC PODCASTS */}
      {podcasts.length > 0 && (
        <Box mt={6}>
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
      )}
    </Container>
  );
}
