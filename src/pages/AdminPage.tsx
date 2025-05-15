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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ImageUploader } from '../components/ImageUploader';
import { PodcastUploader } from '../components/PodcastUploader';

interface MediaItem {
  id: string;
  name: string;
  url?: string;
}

export default function AdminPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [podcasts, setPodcasts] = useState<MediaItem[]>([]);

  // Simulate fetching existing uploads
  useEffect(() => {
    // TODO: fetch real data from your backend/storage
    setImages([]);
    setPodcasts([]);
  }, []);

  const handleDelete = (id: string, type: 'image' | 'podcast') => {
    if (type === 'image') setImages(images.filter((i) => i.id !== id));
    else setPodcasts(podcasts.filter((p) => p.id !== id));
    // TODO: call API to delete
  };

  const handleReplace = (id: string, file: File, type: 'image' | 'podcast') => {
    // TODO: upload new file then update state
    console.log(`Replace ${type} ${id} with`, file);
  };

  const handleImageUpload = (files: File[]) => {
    // After uploading, add to list
    const newItems = files.map((f) => ({
      id: Date.now() + f.name,
      name: f.name,
    }));
    setImages((prev) => [...newItems, ...prev]);
  };

  const handlePodcastUpload = (files: File[]) => {
    const newItems = files.map((f) => ({
      id: Date.now() + f.name,
      name: f.name,
    }));
    setPodcasts((prev) => [...newItems, ...prev]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
        <Tab label="Images" />
        <Tab label="Podcasts" />
      </Tabs>
      <Box mt={2}>
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
                    <Avatar>{/* optional icon */}</Avatar>
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
