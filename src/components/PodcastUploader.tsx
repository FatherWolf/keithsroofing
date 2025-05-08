// src/components/PodcastUploader.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';

export function PodcastUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': [] },
    multiple: false,
  });

  const handleUpload = () => {
    setUploading(true);
    // TODO: Replace with real upload logic
    setTimeout(() => {
      setUploading(false);
      setFiles([]);
    }, 1500);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          bgcolor: isDragActive ? 'action.hover' : 'inherit',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? 'Drop podcast file here…'
            : 'Drag & drop a podcast file here, or click to select'}
        </Typography>
      </Box>

      {files.length > 0 && (
        <Box mt={2} sx={{ textAlign: 'center' }}>
          <Typography variant="body2">{files[0].name}</Typography>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 1 }}
          >
            {uploading ? 'Uploading…' : 'Upload Podcast'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
