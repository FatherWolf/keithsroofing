// src/components/ImageUploader.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, LinearProgress } from '@mui/material';

interface ImageUploaderProps {
  onUpload: (files: File[]) => Promise<void> | void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleUploadClick = async () => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      await onUpload(files);
    } catch (err) {
      console.error('Error in onUpload:', err);
    }
    setFiles([]);
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
            ? 'Drop images here…'
            : 'Drag & drop images here, or click to select'}
        </Typography>
      </Box>

      {files.length > 0 && (
        <Box mt={2}>
          {files.map((file) => (
            <Box key={file.name} sx={{ mb: 1 }}>
              <Typography variant="body2">{file.name}</Typography>
              {uploading && (
                <LinearProgress
                  variant="indeterminate"
                  sx={{ height: 8, borderRadius: 1, mt: 0.5 }}
                />
              )}
            </Box>
          ))}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              {uploading ? 'Uploading…' : 'Upload Images'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
