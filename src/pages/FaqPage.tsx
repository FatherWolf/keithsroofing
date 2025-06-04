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

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [podcastUrl, setPodcastUrl] = useState<string>();
  const [user] = useAuthState(auth);

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
