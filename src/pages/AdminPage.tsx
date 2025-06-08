// src/pages/AdminPage.tsx
import React, { useState, useEffect, useRef } from 'react';
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
  CircularProgress,
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
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [replaceAccept, setReplaceAccept] = useState<
    '' | 'image/*' | 'audio/*'
  >('');
  const replaceHandlerRef = useRef<(file: File) => Promise<void> | void>(
    () => {}
  );

  // Hidden file input used for replace operations
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing media from Firestore on mount
  useEffect(() => {
    const fetchMedia = async () => {
      setLoadingMedia(true);
      try {
        const snap = await getDocs(collection(db, 'media'));
        const items: MediaItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as DocumentData),
        })) as MediaItem[];
        setImages(items.filter((i) => i.type === 'image'));
        setPodcasts(items.filter((i) => i.type === 'podcast'));
      } catch (err) {
        console.error('Error fetching media:', err);
      } finally {
        setLoadingMedia(false);
      }
    };
    fetchMedia();
  }, []);

  // Utility to upload to Storage and return download URL
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Handle deleting a media document (and updating local state)
  const handleDelete = async (id: string, type: 'image' | 'podcast') => {
    try {
      await deleteDoc(doc(db, 'media', id));
      if (type === 'image') {
        setImages((prev) => prev.filter((i) => i.id !== id));
      } else {
        setPodcasts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  // Handle replacing an existing media item with a new file
  const handleReplace = async (
    id: string,
    file: File,
    type: 'image' | 'podcast'
  ) => {
    try {
      const folder = type === 'image' ? 'uploads/images' : 'uploads/podcasts';
      const url = await uploadFile(file, folder);
      await updateDoc(doc(db, 'media', id), {
        url,
        name: file.name,
        updatedAt: Timestamp.now(),
      });
      const updater = (items: MediaItem[]) =>
        items.map((i) => (i.id === id ? { ...i, url, name: file.name } : i));
      if (type === 'image') setImages((prev) => updater(prev));
      else setPodcasts((prev) => updater(prev));
    } catch (err) {
      console.error('Failed to replace media:', err);
    }
  };

  // Triggered by ImageUploader: upload new images, save to Firestore, update state
  const handleImageUpload = async (files: File[]) => {
    const newItems: MediaItem[] = [];
    for (const file of files) {
      try {
        const url = await uploadFile(file, 'uploads/images');
        const docRef = await addDoc(collection(db, 'media'), {
          type: 'image',
          name: file.name,
          url,
          createdAt: Timestamp.now(),
        });
        newItems.push({ id: docRef.id, name: file.name, url, type: 'image' });
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
    setImages((prev) => [...newItems, ...prev]);
  };

  // Triggered by PodcastUploader: upload new podcasts, save to Firestore, update state
  const handlePodcastUpload = async (files: File[]) => {
    const newItems: MediaItem[] = [];
    for (const file of files) {
      try {
        const url = await uploadFile(file, 'uploads/podcasts');
        const docRef = await addDoc(collection(db, 'media'), {
          type: 'podcast',
          name: file.name,
          url,
          createdAt: Timestamp.now(),
        });
        newItems.push({ id: docRef.id, name: file.name, url, type: 'podcast' });
      } catch (err) {
        console.error('Error uploading podcast:', err);
      }
    }
    setPodcasts((prev) => [...newItems, ...prev]);
  };

  // Called when administrator clicks “Replace” on an item.
  const onReplaceClick = (id: string, type: 'image' | 'podcast') => {
    // Set up accept and handler, then trigger hidden file input
    setReplaceAccept(type === 'image' ? 'image/*' : 'audio/*');
    replaceHandlerRef.current = async (file: File) => {
      await handleReplace(id, file, type);
    };
    fileInputRef.current?.click();
  };

  // When hidden input changes (file selected), call the stored handler
  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        await replaceHandlerRef.current(files[0]);
      } catch (err) {
        console.error('Error in replace handler:', err);
      }
    }
    // Reset input so selecting the same file later will still fire change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Hidden file input for “Replace” actions */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept={replaceAccept}
        onChange={onFileInputChange}
      />

      {/* Button to view the public FAQ page */}
      <Box mb={2}>
        <Button component={Link} to="/faq" variant="outlined" color="primary">
          View Public FAQ
        </Button>
      </Box>

      {/* Tabs for Images vs. Podcasts */}
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Images" />
        <Tab label="Podcasts" />
      </Tabs>

      <Box mt={2}>
        {loadingMedia ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Images Tab */}
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
                            aria-label="replace"
                            onClick={() => onReplaceClick(img.id, 'image')}
                          >
                            <SwapHorizIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(img.id, 'image')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={img.url}
                          alt={img.name}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText primary={img.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Podcasts Tab */}
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
                            aria-label="replace"
                            onClick={() => onReplaceClick(p.id, 'podcast')}
                          >
                            <SwapHorizIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
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
          </>
        )}
      </Box>
    </Box>
  );
}
