import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

export function ImageUploader() {
  const onDrop = useCallback((files: File[]) => {
    // TODO: integrate with your upload API/CDN
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{ border: '2px dashed #ccc', p: 2, textAlign: 'center', mb: 4 }}
    >
      <input {...getInputProps()} />
      <Typography>
        {isDragActive
          ? 'Drop images here...'
          : 'Drag & drop images, or click to select.'}
      </Typography>
    </Box>
  );
}
