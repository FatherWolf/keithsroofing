// src/pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ImageUploader } from '../components/ImageUploader';
import { PodcastUploader } from '../components/PodcastUploader';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'podcast';
}

export default function AdminPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [podcasts, setPodcasts] = useState<MediaItem[]>([]);


  // Load existing media from Firestore
  useEffect(() => {
    const fetchMedia = async () => {
      const snap = await getDocs(collection(db, 'media'));
      const items: MediaItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as MediaItem[];
      setImages(items.filter((i) => i.type === 'image'));
      setPodcasts(items.filter((i) => i.type === 'podcast'));
    };
    fetchMedia();

  }, []);

  const handleDelete = async (id: string, type: 'image' | 'podcast') => {
    await deleteDoc(doc(db, 'media', id));
    if (type === 'image') setImages(images.filter((i) => i.id !== id));
    else setPodcasts(podcasts.filter((p) => p.id !== id));

  };

  const handleReplace = async (
    id: string,
    file: File,
    type: 'image' | 'podcast'
  ) => {
    const url = await uploadFile(
      file,
      type === 'image' ? 'uploads/images' : 'uploads/podcasts'
    );
    await updateDoc(doc(db, 'media', id), {
      url,
      name: file.name,
      updatedAt: Timestamp.now(),
    });
    const updater = (items: MediaItem[]) =>
      items.map((i) => (i.id === id ? { ...i, url, name: file.name } : i));
    if (type === 'image') setImages(updater);
    else setPodcasts(updater);
  };

  const uploadFile = async (file: File, folder: string) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleImageUpload = async (files: File[]) => {
    const uploaded: MediaItem[] = [];
    for (const file of files) {
      const url = await uploadFile(file, 'uploads/images');
      const docRef = await addDoc(collection(db, 'media'), {
        type: 'image',
        name: file.name,
        url,
        createdAt: Timestamp.now(),
      });
      uploaded.push({ id: docRef.id, name: file.name, url, type: 'image' });
    }
    setImages((prev) => [...uploaded, ...prev]);

  };

  const handlePodcastUpload = async (files: File[]) => {
    const uploaded: MediaItem[] = [];
    for (const file of files) {
      const url = await uploadFile(file, 'uploads/podcasts');
      const docRef = await addDoc(collection(db, 'media'), {
        type: 'podcast',
        name: file.name,
        url,
        createdAt: Timestamp.now(),
      });
      uploaded.push({ id: docRef.id, name: file.name, url, type: 'podcast' });
    }
    setPodcasts((prev) => [...uploaded, ...prev]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* ----------------------------------------------------------- */}
      {/* View Public FAQ Button */}
      {/* ----------------------------------------------------------- */}
      <Box mb={2}>
        <Button component={Link} to="/faq" variant="outlined" color="primary">
          View Public FAQ
        </Button>
      </Box>

      {/* ----------------------------------------------------------- */}
      {/* Tabs: Images / Podcasts / (you could add a 3rd like “Manage FAQ” here) */}
      {/* ----------------------------------------------------------- */}
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Images" />
        <Tab label="Podcasts" />
      </Tabs>

      <Box mt={2}>
        {/* ===== Images Tab ===== */}
        {tabIndex === 0 && (
          <Box>
            <ImageUploader onUpload={handleImageUpload} />
            <List>
              {images.map((img) => (
                <ListItem
                  key={img.id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          handleReplace(img.id, new File([], ''), 'image')
                        }
                      >
                        <SwapHorizIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(img.id, 'image')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={img.url} alt={img.name} />
                  </ListItemAvatar>
                  <ListItemText primary={img.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* ===== Podcasts Tab ===== */}
        {tabIndex === 1 && (
          <Box>
            <PodcastUploader onUpload={handlePodcastUpload} />
            <List>
              {podcasts.map((p) => (
                <ListItem
                  key={p.id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          handleReplace(p.id, new File([], ''), 'podcast')
                        }
                      >
                        <SwapHorizIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(p.id, 'podcast')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={p.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}
