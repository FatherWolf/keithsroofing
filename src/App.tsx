import React, { Suspense, lazy } from 'react';
import { Layout } from './components/Layout';

// Correct lazy-loaded named exports:
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

export default function App() {
  return (
    <Layout>
      <h1>Welcome to Keith's Roofing</h1>
      <Suspense fallback={<div>Loading uploaders...</div>}>
        <ImageUploader />
        <PodcastUploader />
      </Suspense>
    </Layout>
  );
}
