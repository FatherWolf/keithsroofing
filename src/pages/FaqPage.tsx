// src/pages/FAQPage.tsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { Seo } from '../components/Seo';
// import { storage } from '../firebase'; // <-- make sure you export 'storage' from your firebase setup

// ---- FAQ QUESTIONS ----
// Replace or extend this list with your real FAQs.
const faqQuestions: Array<{ question: string; answer: string }> = [
  {
    question: 'What areas do you serve?',
    answer:
      'We serve Hot Springs, Hot Springs Village, and surrounding Garland County areas. If you’re outside of that zone, reach out and we’ll let you know how we can help!',
  },
  {
    question: 'How can I get a free estimate?',
    answer:
      'Click “Get a Quote” from the top navigation, fill out the form, and we’ll schedule a time to inspect your roof within 48 hours. It’s free and no‐obligation.',
  },
  {
    question: 'What types of roofing materials do you offer?',
    answer:
      'We carry asphalt shingles, metal roofing, and premium cedar shakes. We also install specialty architectural shingles for a high‐end look.',
  },
  {
    question: 'Do you offer emergency repairs?',
    answer:
      'Yes. We’re available 24/7 for storm damage and emergency tarping services. Call our emergency hotline at (501) 922-2020 any time.',
  },
  // …add as many as you like…
];

// Styled container for the image gallery
const GalleryContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  marginTop: theme.spacing(4),
}));

// Styled container for the podcast list
const PodcastContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

export default function FAQPage() {
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);
  const [podcastURLs, setPodcastURLs] = useState<string[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  useEffect(() => {
    // 1) FETCH FAQ PHOTOS
    const photosRef = ref(storage, 'faq-photos');
    listAll(photosRef)
      .then((res) => {
        // getDownloadURL for each item in the folder
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(urlPromises);
      })
      .then((urls) => {
        setPhotoURLs(urls);
      })
      .catch((err) => {
        console.error('Error listing FAQ photos:', err);
      })
      .finally(() => {
        setLoadingPhotos(false);
      });

    // 2) FETCH FAQ PODCASTS
    const podcastsRef = ref(storage, 'faq-podcasts');
    listAll(podcastsRef)
      .then((res) => {
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(urlPromises);
      })
      .then((urls) => {
        setPodcastURLs(urls);
      })
      .catch((err) => {
        console.error('Error listing FAQ podcasts:', err);
      })
      .finally(() => {
        setLoadingPodcasts(false);
      });
  }, []);

  return (
    <>
      <Seo
        title="Keith’s Roofing | Frequently Asked Questions"
        description="Find answers to common roofing questions, view our gallery of completed jobs, and listen to our podcast episodes."
      />

      <Container sx={{ py: 6 }}>
        {/* FAQ HEADER */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Frequently Asked Questions
        </Typography>

        {/* ACCORDION LIST */}
        {faqQuestions.map((faq, idx) => (
          <Accordion key={idx} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* UPLOADED PHOTO GALLERY */}
        <Typography variant="h4" gutterBottom sx={{ mt: 6, fontWeight: 600 }}>
          FAQ Photo Gallery
        </Typography>
        {loadingPhotos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : photoURLs.length ? (
          <GalleryContainer>
            {photoURLs.map((url, i) => (
              <Card key={i} elevation={3}>
                <CardMedia
                  component="img"
                  src={url}
                  alt={`FAQ Photo ${i + 1}`}
                  loading="lazy"
                  sx={{ height: 180, objectFit: 'cover' }}
                />
              </Card>
            ))}
          </GalleryContainer>
        ) : (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No FAQ photos have been uploaded yet.
          </Typography>
        )}

        {/* UPLOADED PODCASTS */}
        <Typography variant="h4" gutterBottom sx={{ mt: 6, fontWeight: 600 }}>
          FAQ Podcast Episodes
        </Typography>
        {loadingPodcasts ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : podcastURLs.length ? (
          <PodcastContainer>
            {podcastURLs.map((url, i) => (
              <Box key={i}>
                <Typography variant="subtitle2" gutterBottom>
                  Episode {i + 1}
                </Typography>
                <Box
                  component="audio"
                  controls
                  src={url}
                  sx={{ width: '100%' }}
                />
              </Box>
            ))}
          </PodcastContainer>
        ) : (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No FAQ podcasts have been uploaded yet.
          </Typography>
        )}
      </Container>
    </>
  );
}
