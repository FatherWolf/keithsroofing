// src/components/VideoUploader.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, LinearProgress, TextField } from '@mui/material';

interface VideoUploaderProps {
  onUpload: (files: File[], titles: string[], descriptions: string[]) => Promise<void> | void;
}

export function VideoUploader({ onUpload }: VideoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
    setTitles((prev) => [...prev, ...new Array(accepted.length).fill('')]);
    setDescriptions((prev) => [...prev, ...new Array(accepted.length).fill('')]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    },
    multiple: true,
  });

  const handleUploadClick = async () => {
    if (files.length === 0) return;
    console.log('VideoUploader: Starting upload of', files.length, 'files');
    setUploading(true);
    try {
      await onUpload(files, titles, descriptions);
      console.log('VideoUploader: Upload completed successfully');
    } catch (err) {
      console.error('VideoUploader: Upload failed:', err);
    }
    setFiles([]);
    setTitles([]);
    setDescriptions([]);
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
            ? 'Drop video files here…'
            : 'Drag & drop video files here, or click to select'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Supported formats: MP4, MOV, AVI, MKV, WebM
        </Typography>
      </Box>

      {files.length > 0 && (
        <Box mt={2}>
          {files.map((file, index) => (
            <Box key={file.name} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>{file.name}</Typography>
              <TextField
                fullWidth
                label="Video Title"
                placeholder="Enter a title for this video..."
                value={titles[index] || ''}
                onChange={(e) => {
                  const newTitles = [...titles];
                  newTitles[index] = e.target.value;
                  setTitles(newTitles);
                }}
                size="small"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Description (optional)"
                placeholder="Enter a description for this video..."
                value={descriptions[index] || ''}
                onChange={(e) => {
                  const newDescriptions = [...descriptions];
                  newDescriptions[index] = e.target.value;
                  setDescriptions(newDescriptions);
                }}
                size="small"
                multiline
                rows={2}
                sx={{ mb: 1 }}
              />
              {uploading && (
                <LinearProgress
                  variant="indeterminate"
                  sx={{ height: 8, borderRadius: 1 }}
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
              {uploading ? 'Uploading…' : 'Upload Videos'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
