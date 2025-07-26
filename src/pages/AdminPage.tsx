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
import { useAuthState } from 'react-firebase-hooks/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ImageUploader } from '../components/ImageUploader';
import { VideoUploader } from '../components/VideoUploader';
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
import { db, storage, auth } from '../firebase';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  title?: string;
  description?: string;
}

export default function AdminPage() {
  const [user, loading, error] = useAuthState(auth);
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [replaceAccept, setReplaceAccept] = useState<
    '' | 'image/*' | 'video/*'
  >('');
  const replaceHandlerRef = useRef<(file: File) => Promise<void> | void>(
    () => {}
  );

  // Debug authentication status
  useEffect(() => {
    console.log('Auth state:', { user: user?.uid, loading, error });
  }, [user, loading, error]);

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
        setVideos(items.filter((i) => i.type === 'video'));
      } catch (err) {
        console.error('Error fetching media from Firestore:', err);
      } finally {
        setLoadingMedia(false);
      }
    };
    fetchMedia();
  }, []);

  // Utility to upload to Storage and return download URL
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    console.log('Starting upload for:', file.name, 'to folder:', folder);
    
    if (!user) {
      throw new Error('User must be authenticated to upload files');
    }
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      console.log('Storage ref created:', storageRef.fullPath);
      
      // Create metadata to help with CORS
      const metadata = {
        contentType: file.type,
        customMetadata: {
          'uploaded-by': user.uid,
          'upload-time': new Date().toISOString()
        }
      };
      
      console.log('Uploading with Firebase SDK and metadata...');
      const uploadResult = await uploadBytes(storageRef, file, metadata);
      console.log('Upload completed:', uploadResult);
      
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Upload failed:', error);
      console.error('Error details:', {
        code: (error as any)?.code,
        message: (error as any)?.message,
        serverResponse: (error as any)?.serverResponse
      });
      throw error;
    }
  };

  // Handle deleting a media document (and updating local state)
  const handleDelete = async (id: string, type: 'image' | 'video') => {
    try {
      await deleteDoc(doc(db, 'media', id));
      if (type === 'image') {
        setImages((prev) => prev.filter((i) => i.id !== id));
      } else {
        setVideos((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      // Handle error - could show user notification
    }
  };

  // Handle replacing an existing media item with a new file
  const handleReplace = async (
    id: string,
    file: File,
    type: 'image' | 'video'
  ) => {
    try {
      const folder = type === 'image' ? 'uploads/images' : 'uploads/videos';
      const url = await uploadFile(file, folder);
      await updateDoc(doc(db, 'media', id), {
        url,
        name: file.name,
        updatedAt: Timestamp.now(),
      });
      const updater = (items: MediaItem[]) =>
        items.map((i) => (i.id === id ? { ...i, url, name: file.name } : i));
      if (type === 'image') setImages((prev) => updater(prev));
      else setVideos((prev) => updater(prev));
    } catch (err) {
      // Handle error - could show user notification
    }
  };

  // Triggered by ImageUploader: upload new images, save to Firestore, update state
  const handleImageUpload = async (files: File[], descriptions: string[]) => {
    console.log('Starting image upload for', files.length, 'files');
    const newItems: MediaItem[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const description = descriptions[i] || '';
      try {
        console.log('Processing file:', file.name);
        const url = await uploadFile(file, 'uploads/images');
        console.log('File uploaded, saving to Firestore...');
        
        const docRef = await addDoc(collection(db, 'media'), {
          type: 'image',
          name: file.name,
          url,
          description,
          createdAt: Timestamp.now(),
        });
        console.log('Saved to Firestore with ID:', docRef.id);
        
        newItems.push({ id: docRef.id, name: file.name, url, type: 'image', description });
      } catch (err) {
        console.error('Error uploading file:', file.name, err);
      }
    }
    
    console.log('Adding', newItems.length, 'new items to state');
    setImages((prev) => [...newItems, ...prev]);
  };

  // Triggered by VideoUploader: upload new videos, save to Firestore, update state
  const handleVideoUpload = async (files: File[], titles: string[], descriptions: string[]) => {
    console.log('Starting video upload for', files.length, 'files');
    const newItems: MediaItem[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = titles[i] || '';
      const description = descriptions[i] || '';
      try {
        console.log('Processing video file:', file.name);
        const url = await uploadFile(file, 'uploads/videos');
        console.log('Video uploaded, saving to Firestore...');
        
        const docRef = await addDoc(collection(db, 'media'), {
          type: 'video',
          name: file.name,
          title,
          url,
          description,
          createdAt: Timestamp.now(),
        });
        console.log('Saved to Firestore with ID:', docRef.id);
        
        newItems.push({ 
          id: docRef.id, 
          name: file.name, 
          title, 
          url, 
          type: 'video', 
          description 
        });
      } catch (err) {
        console.error('Error uploading video file:', file.name, err);
      }
    }
    
    console.log('Adding', newItems.length, 'new video items to state');
    setVideos((prev) => [...newItems, ...prev]);
  };

  // Called when administrator clicks “Replace” on an item.
  const onReplaceClick = (id: string, type: 'image' | 'video') => {
    // Set up accept and handler, then trigger hidden file input
    setReplaceAccept(type === 'image' ? 'image/*' : 'video/*');
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
        // Handle error - could show user notification
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

      {/* Tabs for Images vs. Videos */}
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Images" />
        <Tab label="Videos" />
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
                      <ListItemText 
                        primary={img.description || 'No description'} 
                        secondary={img.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Videos Tab */}
            {tabIndex === 1 && (
              <Box>
                <VideoUploader onUpload={handleVideoUpload} />
                <List>
                  {videos.map((v) => (
                    <ListItem
                      key={v.id}
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="replace"
                            onClick={() => onReplaceClick(v.id, 'video')}
                          >
                            <SwapHorizIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(v.id, 'video')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={v.title || 'No title'} 
                        secondary={v.name}
                      />
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
