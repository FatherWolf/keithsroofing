// src/pages/GalleryPage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useTheme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { collection, onSnapshot, DocumentData, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Seo } from '../components/Seo';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  title?: string;
  description?: string;
  createdAt?: any;
}

const MotionBox = styled(motion.div)<{ sx?: any }>(() => ({}));
const MotionCard = styled(motion.div)<{ sx?: any }>(() => ({}));

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
  const theme = useTheme();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    console.log('GalleryPage: Setting up media listener');
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        console.log('GalleryPage: Received', snap.docs.length, 'documents from Firestore');
        const items = snap.docs.map((d) => {
          const data = d.data() as DocumentData;
          console.log('GalleryPage: Document data:', { id: d.id, ...data });
          return {
            id: d.id,
            ...data,
          };
        }) as MediaItem[];
        console.log('GalleryPage: Processed media items:', items);
        setMedia(items);
      },
      (err) => {
        console.error('GalleryPage: Firestore error:', err);
        setError(err.message);
      }
    );
    return () => unsub();
  }, []);

  // Filter and search logic
  const filteredMedia = media.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = searchTerm === '' || 
      (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMedia.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMedia = filteredMedia.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const images = filteredMedia.filter((m) => m.type === 'image');
  const videos = filteredMedia.filter((m) => m.type === 'video');

  const handleImageClick = (image: MediaItem) => {
    if (image.type === 'image') {
      setSelectedImage(image);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImage(null);
  };

  const handleFilterChange = (filter: 'all' | 'image' | 'video') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Seo
        title="Roofing Gallery Arkansas | Keith's Roofing Portfolio & Projects"
        description="View our roofing project gallery and portfolio. See completed roofing installations, repairs, and renovations by Keith's Roofing Arkansas."
      />
      
      {/* HERO SECTION */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <MotionBox {...fadeUp} sx={{ textAlign: 'center', mb: 6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Project Gallery
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Explore our portfolio of premium roofing installations and transformations across Arkansas.
            </Typography>
          </MotionBox>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* SEARCH AND FILTERS */}
          <MotionBox {...fadeUp} sx={{ mb: 6 }} style={{ marginBottom: '48px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                alignItems: { xs: 'stretch', md: 'center' },
                justifyContent: 'space-between',
                mb: 4
              }}
            >
              <TextField
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ minWidth: { md: '300px' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`All (${media.length})`}
                  onClick={() => handleFilterChange('all')}
                  variant={activeFilter === 'all' ? 'filled' : 'outlined'}
                  color={activeFilter === 'all' ? 'primary' : 'default'}
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label={`Images (${images.length})`}
                  onClick={() => handleFilterChange('image')}
                  variant={activeFilter === 'image' ? 'filled' : 'outlined'}
                  color={activeFilter === 'image' ? 'secondary' : 'default'}
                  icon={<ImageIcon />}
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label={`Videos (${videos.length})`}
                  onClick={() => handleFilterChange('video')}
                  variant={activeFilter === 'video' ? 'filled' : 'outlined'}
                  color={activeFilter === 'video' ? 'success' : 'default'}
                  icon={<VideoLibraryIcon />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* GALLERY CONTENT */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {paginatedMedia.length > 0 ? (
          <>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
              }}
            >
              {paginatedMedia.map((item, index) => (
                <MotionCard
                  key={item.id}
                  {...fadeUp}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: theme.palette.background.paper,
                      cursor: item.type === 'image' ? 'pointer' : 'default',
                      '&:hover': item.type === 'image' ? {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                      } : {},
                      transition: 'all 0.3s ease',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                    onClick={() => handleImageClick(item)}
                  >
                    {item.type === 'image' ? (
                      <>
                        <CardMedia
                          component="img"
                          src={item.url}
                          alt={`${item.description || item.name} - Roofing project by Keith's Roofing Arkansas`}
                          loading="lazy"
                          sx={{ 
                            height: 220, 
                            objectFit: 'cover',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              transition: 'transform 0.3s ease'
                            }
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.text.primary,
                              fontWeight: 500,
                              mb: 1
                            }}
                          >
                            {item.description || item.name}
                          </Typography>
                          <Chip 
                            label="View Full Size" 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        </CardContent>
                      </>
                    ) : (
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <VideoLibraryIcon sx={{ mr: 1, color: 'success.main' }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Video
                          </Typography>
                        </Box>
                        {item.title && (
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              mb: 1
                            }}
                          >
                            {item.title}
                          </Typography>
                        )}
                        {item.description && (
                          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                            {item.description}
                          </Typography>
                        )}
                        <Box
                          component="video"
                          controls
                          src={item.url}
                          sx={{ 
                            width: '100%',
                            maxHeight: '200px',
                            borderRadius: 1
                          }}
                        />
                        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: theme.palette.text.disabled }}>
                          {item.name}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </MotionCard>
              ))}
            </Box>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 600
                    }
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <MotionBox {...fadeUp} sx={{ textAlign: 'center', py: 8 }} style={{ textAlign: 'center', padding: '64px 0' }}>
            <ImageIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              {searchTerm || activeFilter !== 'all' ? 'No items match your criteria' : 'No content available yet'}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
              {searchTerm || activeFilter !== 'all' ? 'Try adjusting your search or filter' : 'Check back soon for our latest projects'}
            </Typography>
          </MotionBox>
        )}
      </Container>

      {/* IMAGE MODAL */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {selectedImage?.title || selectedImage?.description || selectedImage?.name || 'Project Image'}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          {selectedImage && (
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.title || selectedImage.description || selectedImage.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
