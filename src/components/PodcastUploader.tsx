// src/components/PodcastUploader.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, LinearProgress } from '@mui/material';

interface PodcastUploaderProps {
  onUpload: (files: File[]) => Promise<void> | void;
}

export function PodcastUploader({ onUpload }: PodcastUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': [] },
    multiple: false,
  });

  const handleUploadClick = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload([file]);
    } catch (err) {
      console.error('Error in onUpload:', err);
    }
    setFile(null);
    setUploading(false);
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

      {file && (
        <Box mt={2}>
          <Typography variant="body2">{file.name}</Typography>
          {uploading && (
            <LinearProgress
              variant="indeterminate"
              sx={{ height: 8, borderRadius: 1, mt: 0.5 }}
            />
          )}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              {uploading ? 'Uploading…' : 'Upload Podcast'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
