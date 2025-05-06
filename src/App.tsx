// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

// Lazy-loaded admin uploaders
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

// Public pages
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
      <Routes>
        {/* Public login */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<div>Loading admin tools…</div>}>
                  <ImageUploader />
                  <PodcastUploader />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* All other routes use your public Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="location" element={<LocationPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="faq" element={<FAQPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
