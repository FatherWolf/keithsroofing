// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy-loaded uploaders
const ImageUploader = lazy(() =>
  import('./components/ImageUploader').then((mod) => ({
    default: mod.ImageUploader,
  }))
);
const PodcastUploader = lazy(() =>
  import('./components/PodcastUploader').then((mod) => ({
    default: mod.PodcastUploader,
  }))
);

// Page components
function HomePage() {
  return (
    <>
      <h1>Welcome to Keith's Roofing</h1>
      <Suspense fallback={<div>Loading uploaders...</div>}>
        <ImageUploader />
        <PodcastUploader />
      </Suspense>
    </>
  );
}
function LocationPage() {
  return <h2>Our Locations</h2>;
}
function ContactPage() {
  return <h2>Contact Us</h2>;
}
function FAQPage() {
  return <h2>FAQ</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
