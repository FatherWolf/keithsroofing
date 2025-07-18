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

/**
 * ContactFormPage
 * Renders a roofing estimate contact form and handles email submissions via EmailJS.
 */
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
  const [error, setError] = useState<string | null>(null);

  // Initialize EmailJS with your public key
  useEffect(() => {
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    console.log('EmailJS Public Key:', userId);
    if (!userId) {
      console.error('EmailJS public key is missing.');
      setError('Configuration error. Please contact support.');
      return;
    }
    // Set allowed origin in EmailJS dashboard for your domain (e.g., localhost:3000)
    emailjs.init(userId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formRef.current) {
      setError('Form initialization error.');
      return;
    }

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    console.log('Sending with:', {
      serviceId,
      templateId,
      userId,
      form: formRef.current,
    });
    if (!serviceId || !templateId || !userId) {
      console.error('EmailJS config missing:', {
        serviceId,
        templateId,
        userId,
      });
      setError('Configuration error. Please contact support.');
      return;
    }

    try {
      const response = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        userId
      );
      console.log('EmailJS response:', response);
      setSubmitted(true);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      const msg = err?.text || err?.message || 'Unknown error';
      setError(`Failed to send message: ${msg}`);
    }
  };

  // Redirect after successful submission
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
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
        {error && <Alert severity="error">{error}</Alert>}

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
