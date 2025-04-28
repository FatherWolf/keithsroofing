import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';

export function PodcastUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Button variant="contained" component="label">
        Upload Podcast
        <input type="file" hidden accept="audio/*" onChange={handleChange} />
      </Button>
      {file && <Typography mt={1}>Selected: {file.name}</Typography>}
    </Box>
  );
}
