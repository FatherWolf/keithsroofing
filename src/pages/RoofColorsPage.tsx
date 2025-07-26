// src/pages/RoofColorsPage.tsx
import React from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Seo } from '../components/Seo';
import { Link as RouterLink } from 'react-router-dom';

interface RoofSwatch {
  name: string;
  image: string;
  description?: string;
}

export default function RoofColorsPage() {
  const theme = useTheme();

  // Import roof color images
  const roofSwatches: RoofSwatch[] = [
    {
      name: 'Antique Slate',
      image: require('../images/RoofColors/antique-slate.webp'),
      description: 'Classic blue-gray tones with weathered appeal'
    },
    {
      name: 'Autumn Brown',
      image: require('../images/RoofColors/autumn-brown.webp'),
      description: 'Rich earth tones with warm brown hues'
    },
    {
      name: 'Black Walnut',
      image: require('../images/RoofColors/black-walnut.webp'),
      description: 'Deep charcoal with subtle grain patterns'
    },
    {
      name: 'Desert Sand',
      image: require('../images/RoofColors/desert-sand.webp'),
      description: 'Warm beige with natural sand textures'
    },
    {
      name: 'Mountain Slate',
      image: require('../images/RoofColors/mountain-slate.webp'),
      description: 'Cool gray with blue undertones'
    },
    {
      name: 'Natural Timber',
      image: require('../images/RoofColors/natural-timber.webp'),
      description: 'Wood-inspired browns with natural variation'
    },
    {
      name: 'Old English Pewter',
      image: require('../images/RoofColors/olde-english-pewter.webp'),
      description: 'Silver-gray with metallic highlights'
    },
    {
      name: 'Oxford Grey',
      image: require('../images/RoofColors/oxford-grey.webp'),
      description: 'Sophisticated charcoal with modern appeal'
    },
    {
      name: 'Painted Desert',
      image: require('../images/RoofColors/painted-desert.webp'),
      description: 'Multi-toned beige with desert-inspired hues'
    },
    {
      name: 'Rustic Black',
      image: require('../images/RoofColors/rustic-black.webp'),
      description: 'Deep black with rustic texture appeal'
    },
    {
      name: 'Rustic Brown',
      image: require('../images/RoofColors/rustic-brown.webp'),
      description: 'Rich brown with traditional rustic charm'
    },
    {
      name: 'Rustic Cedar',
      image: require('../images/RoofColors/rustic-cedar.webp'),
      description: 'Warm cedar tones with natural wood appeal'
    },
    {
      name: 'Rustic Evergreen',
      image: require('../images/RoofColors/rustic-evergreen.webp'),
      description: 'Deep forest green with rustic texture'
    },
    {
      name: 'Rustic Hickory',
      image: require('../images/RoofColors/rustic-hickory.webp'),
      description: 'Hickory brown with natural wood variation'
    },
    {
      name: 'Rustic Redwood',
      image: require('../images/RoofColors/rustic-redwood.webp'),
      description: 'Rich redwood tones with rustic appeal'
    },
    {
      name: 'Rustic Slate',
      image: require('../images/RoofColors/rustic-slate.webp'),
      description: 'Dark slate gray with rustic texture'
    },
    {
      name: 'Shadow Grey',
      image: require('../images/RoofColors/shadow-grey.webp'),
      description: 'Medium gray with subtle shadow tones'
    },
    {
      name: 'Thunderstorm Grey',
      image: require('../images/RoofColors/thunderstorm-grey.webp'),
      description: 'Storm-inspired gray with dramatic appeal'
    },
    {
      name: 'Virginia Slate',
      image: require('../images/RoofColors/virginia-slate.webp'),
      description: 'Classic slate blue-gray from Virginia quarries'
    },
    {
      name: 'Weathered Wood',
      image: require('../images/RoofColors/weathered-wood.webp'),
      description: 'Aged wood tones with weathered character'
    }
  ];

  return (
    <>
      <Seo
        title="Roof Colors & Styles Arkansas | Keith's Roofing Color Options"
        description="Browse 20+ premium roofing colors and styles available in Arkansas. Find the perfect shingle color for your custom roof installation with Keith's Roofing."
      />

      <Container sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            Roof Swatches
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
            Choose from our premium selection of roofing colors and styles
          </Typography>
          
          {/* Call to Action */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              sx={{
                bgcolor: theme.palette.secondary.main,
                '&:hover': { bgcolor: theme.palette.secondary.dark },
                textTransform: 'none',
              }}
            >
              Get Free Estimate
            </Button>
            <Button
              component={RouterLink}
              to="/services"
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              Back to Services
            </Button>
          </Box>
        </Box>

        {/* Swatches Grid */}
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {roofSwatches.map((swatch, index) => (
            <Card
              key={index}
              sx={{
                boxShadow: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={swatch.image}
                alt={`${swatch.name} roofing shingle color option - Keith's Roofing Arkansas`}
                loading="lazy"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {swatch.name}
                </Typography>
                {swatch.description && (
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {swatch.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 8, py: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to Transform Your Roof?
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
            Contact us today for a free consultation and estimate. Our experts will help you choose 
            the perfect color and style for your home.
          </Typography>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            size="large"
            sx={{
              bgcolor: theme.palette.secondary.main,
              '&:hover': { bgcolor: theme.palette.secondary.dark },
              textTransform: 'none',
              px: 4,
              py: 1.5,
            }}
          >
            Request Free Estimate
          </Button>
        </Box>
      </Container>
    </>
  );
}