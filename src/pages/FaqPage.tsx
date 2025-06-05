// src/pages/FaqPage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
} from '@mui/material';
import { ImageUploader } from '../components/ImageUploader';
import { PodcastUploader } from '../components/PodcastUploader';
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  imageUrl?: string | null;
  podcastUrl?: string | null;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [podcastUrl, setPodcastUrl] = useState<string>();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPodcast, setUploadingPodcast] = useState(false);

  const [user] = useAuthState(auth);

  // Fetch existing FAQs from Firestore
  useEffect(() => {
    const fetchFaqs = async () => {
      const snap = await getDocs(collection(db, 'faqs'));
      const items: FaqItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as FaqItem[];
      setFaqs(items);
    };
    fetchFaqs();
  }, []);

  // Helper: upload a single file to Storage under `folder/…` and return its public URL
  const uploadFile = (file: File, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {
          // You could track progress here if desired
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  // Called by <ImageUploader /> when admin selects files
  const handleImageUpload = async (files: File[]) => {
    setUploadingImage(true);
    try {
      const url = await uploadFile(files[0], 'faq_images');
      setImageUrl(url);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
    setUploadingImage(false);
  };

  // Called by <PodcastUploader /> when admin selects audio
  const handlePodcastUpload = async (files: File[]) => {
    setUploadingPodcast(true);
    try {
      const url = await uploadFile(files[0], 'faq_podcasts');
      setPodcastUrl(url);
    } catch (err) {
      console.error('Error uploading podcast:', err);
    }
    setUploadingPodcast(false);
  };

  // When “Save FAQ” is clicked:
  const handleAddFaq = async () => {
    if (!question || !answer) return;
    const docRef = await addDoc(collection(db, 'faqs'), {
      question,
      answer,
      imageUrl: imageUrl || null,
      podcastUrl: podcastUrl || null,
      createdAt: Timestamp.now(),
    });
    setFaqs((prev) => [
      {
        id: docRef.id,
        question,
        answer,
        imageUrl: imageUrl || null,
        podcastUrl: podcastUrl || null,
      },
      ...prev,
    ]);

    // Clear form
    setQuestion('');
    setAnswer('');
    setImageUrl(undefined);
    setPodcastUrl(undefined);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions (Admin)
      </Typography>

      {/* List existing FAQs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {faqs.map((f) => (
          <Box
            key={f.id}
            sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}
          >
            <Typography variant="h6">{f.question}</Typography>
            <Typography variant="body2" paragraph>
              {f.answer}
            </Typography>
            {f.imageUrl && (
              <Card sx={{ maxWidth: 400, mb: 1 }}>
                <CardMedia
                  component="img"
                  src={f.imageUrl}
                  alt="FAQ related"
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
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
        ))}
      </Box>

      {/* Only show “Add FAQ” form if user is signed in */}
      {user && (
        <Box mt={4} sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add New FAQ
          </Typography>

          <TextField
            label="Question"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Answer"
            fullWidth
            multiline
            minRows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Upload an Image (optional):
          </Typography>
          <ImageUploader onUpload={handleImageUpload} />
          {uploadingImage && <CircularProgress size={24} sx={{ mt: 1 }} />}

          <Typography variant="subtitle1" sx={{ mb: 1, mt: 3 }}>
            Upload a Podcast (optional):
          </Typography>
          <PodcastUploader onUpload={handlePodcastUpload} />
          {uploadingPodcast && <CircularProgress size={24} sx={{ mt: 1 }} />}

          <Button variant="contained" onClick={handleAddFaq} sx={{ mt: 3 }}>
            Save FAQ
          </Button>
        </Box>
      )}
    </Container>
  );
}
