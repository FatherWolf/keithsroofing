// src/pages/ContactFormPage.tsx
import React, { useState, useEffect, useRef } from 'react';
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
import emailjs from '@emailjs/browser';

export default function ContactFormPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // initialize EmailJS with your Public Key
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
    }
  };

  // after confirmation, redirect home
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
        Get a Free Roofing Estimate
      </Typography>

      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* hidden timestamp field */}
        <input type="hidden" name="time" value={new Date().toLocaleString()} />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="First Name"
            name="first_name"
            required
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            name="last_name"
            required
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>

        <TextField
          label="Email Address"
          name="email"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Address"
          name="address"
          required
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Your Message"
          name="message"
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

        <Typography align="center" variant="subtitle2" sx={{ mt: 1 }}>
          Or call us anytime at <a href="tel:7777777777">777-777-7777</a>
        </Typography>
      </Box>
    </Container>
  );
}
