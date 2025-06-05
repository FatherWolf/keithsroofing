
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,

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

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface FaqItem {
  id: string;
  question: string;
  answer: string;

  imageUrl?: string;
  podcastUrl?: string;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'podcast';

}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [podcastUrl, setPodcastUrl] = useState<string>();
  const [images, setImages] = useState<MediaItem[]>([]);
  const [podcasts, setPodcasts] = useState<MediaItem[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      const faqSnap = await getDocs(collection(db, 'faqs'));
      const faqItems: FaqItem[] = faqSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as FaqItem[];
      setFaqs(faqItems);

      const mediaSnap = await getDocs(collection(db, 'media'));
      const mediaItems: MediaItem[] = mediaSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as MediaItem[];
      setImages(mediaItems.filter((m) => m.type === 'image'));
      setPodcasts(mediaItems.filter((m) => m.type === 'podcast'));
    };
    fetchData();
  }, []);

  const uploadFile = async (file: File, folder: string) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleImageUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const url = await uploadFile(files[0], 'faq_images');
    setImageUrl(url);
  };

  const handlePodcastUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const url = await uploadFile(files[0], 'faq_podcasts');
    setPodcastUrl(url);
  };

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

        imageUrl,
        podcastUrl,
      },
      ...prev,
    ]);

    setQuestion('');
    setAnswer('');
    setImageUrl(undefined);
    setPodcastUrl(undefined);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>

        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {faqs.map((f) => (
          <Box key={f.id} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>

            <Typography variant="h6">{f.question}</Typography>
            <Typography variant="body2" paragraph>
              {f.answer}
            </Typography>
            {f.imageUrl && (

              <Box
                component="img"
                src={f.imageUrl}
                alt="FAQ related"
                sx={{ maxWidth: '100%', mb: 1 }}
              />
            )}
            {f.podcastUrl && (
              <Box component="audio" controls src={f.podcastUrl} sx={{ width: '100%' }} />
            )}
          </Box>
        ))}
      </Box>

      {images.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Videos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {images.map((img) => (
              <Box
                key={img.id}
                component="img"
                src={img.url}
                alt={img.name}
                sx={{ maxWidth: 300, width: '100%', borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
      )}

      {podcasts.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Podcasts
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {podcasts.map((p) => (
              <Box key={p.id} component="audio" controls src={p.url} />
            ))}
          </Box>
        </Box>
      )}

      {user && (
        <Box mt={4} sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add FAQ
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
          <ImageUploader onUpload={handleImageUpload} />
          <PodcastUploader onUpload={handlePodcastUpload} />
          <Button variant="contained" onClick={handleAddFaq}>

            Save FAQ
          </Button>
        </Box>
      )}
    </Container>
  );
}
