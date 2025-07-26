// src/pages/PublicFaqPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  imageUrl?: string;
  podcastUrl?: string;
}

export default function PublicFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const snap: QuerySnapshot<DocumentData> = await getDocs(
          collection(db, 'faqs')
        );
        const items: FaqItem[] = snap.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            question: data.question,
            answer: data.answer,
            imageUrl: data.imageUrl ?? undefined,
            podcastUrl: data.podcastUrl ?? undefined,
          };
        });
        setFaqs(items);
      } catch (err) {
        // Handle error silently or show user-friendly message
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.length === 0 ? (
        <Typography>No FAQs found.</Typography>
      ) : (
        faqs.map((f) => (
          <Box
            key={f.id}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              pb: 2,
              mb: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {f.question}
            </Typography>
            <Typography variant="body1" paragraph>
              {f.answer}
            </Typography>

            {f.imageUrl && (
              <Box
                component="img"
                src={f.imageUrl}
                alt="FAQ image"
                sx={{ maxWidth: '100%', mb: 2, borderRadius: 1 }}
              />
            )}

            {f.podcastUrl && (
              <Box
                component="audio"
                controls
                src={f.podcastUrl}
                sx={{ width: '100%' }}
              />
            )}
          </Box>
        ))
      )}
    </Container>
  );
}
