import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Seo } from '../components/Seo';

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
    if (!userId) {
      setError('Configuration error. Please contact support.');
      return;
    }
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

    if (!serviceId || !templateId || !userId) {
      setError('Configuration error. Please contact support.');
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        userId
      );
      setSubmitted(true);
    } catch (err: any) {
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
      <>
        <Seo
          title="Thank You | Keith's Roofing Arkansas"
          description="Thank you for contacting Keith's Roofing. We've received your request and will be in touch shortly."
        />
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
          }}
        >
          <Container maxWidth="md">
            <Card
              sx={{
                textAlign: 'center',
                p: 6,
                borderRadius: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ mb: 4 }}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 80,
                    color: 'success.main',
                    mb: 2
                  }}
                />
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2
                  }}
                >
                  Thank You!
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: '500px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  We've received your roofing estimate request and will contact you within 24 hours to discuss your project.
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                  p: 4,
                  mb: 4,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  What Happens Next?
                </Typography>
                <Box 
                  sx={{ 
                    mt: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <EmailIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      1. Review
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We'll review your project details and requirements
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <PhoneIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      2. Contact
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our team will call you to schedule a consultation
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      3. Visit
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Free on-site inspection and detailed estimate
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Need immediate assistance? Call us at{' '}
                <Typography component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  (501) 922-4663
                </Typography>
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                Redirecting you back to home in a few seconds...
              </Typography>
            </Card>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Free Roofing Estimate Arkansas | Contact Keith's Roofing"
        description="Get your free roofing estimate from Keith's Roofing Arkansas. Contact us today for custom installations, repairs, and inspections. Licensed roofing contractor."
      />
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          py: 8
        }}
      >
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Get Your Free Roofing Estimate
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Ready to transform your roof? Get a professional estimate from Arkansas's trusted roofing experts.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label="Free Consultation"
                sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 600 }}
              />
              <Chip
                label="Licensed & Insured"
                sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }}
              />
              <Chip
                label="24-Hour Response"
                sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
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

              <Typography align="center" variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
                Or call us anytime at{' '}
                <Typography
                  component="a"
                  href="tel:5019224663"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  (501) 922-4663
                </Typography>
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}
