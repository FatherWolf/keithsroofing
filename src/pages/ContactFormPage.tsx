// src/pages/ContactFormPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ContactFormPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call emailjs.send(...) here
    setSubmitted(true);
  };

  // after showing confirmation, navigate home in 3s
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(t);
    }
  }, [submitted, navigate]);

  if (submitted) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 4 }}>
          Thanks for reaching out! We’ll be in touch shortly.
        </Alert>
        <Typography>Redirecting you back to home…</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Get your Free Inspection or Quote now!
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="First Name"
            required
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            required
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <TextField
          label="Email Address"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone Number"
          type="tel"
          required
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Address"
          required
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Your Message"
          required
          multiline
          minRows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: theme.palette.secondary.main,
            '&:hover': { bgcolor: theme.palette.secondary.dark },
            textTransform: 'none',
          }}
        >
          Submit
        </Button>
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mt: 4 }}
      >
        We respect your privacy. Your information will only be used to respond
      </Typography>
      <Box
        sx={{
          mt: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" gutterBottom>
          Need immediate assistance? Call us anytime, day or night:
        </Typography>
        <Typography variant="h6">
          <a
            href="tel:5019222020"
            style={{
              color: theme.palette.secondary.main,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            (501) 922-2020
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
