// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// -- Layouts & Authentication
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// -- Pages
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Location from './pages/Location';
// import ContactPage from "./pages/ContactPage"; // <-- Not built yet, so commented out
import PublicFaqPage from './pages/PublicFaqPage';
import AdminPage from './pages/AdminPage';

// -- Admin‐only sub‐pages
const FaqPage = lazy(() => import('./pages/FaqPage'));
// const ProjectGalleryPage = lazy(() => import("./pages/ProjectGalleryPage")); // <-- Not needed now

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================================================================= */}
        {/* 1) PUBLIC ROUTES */}
        {/* ================================================================= */}

        {/* Login (public) */}
        <Route path="/login" element={<Login />} />

        {/* Home (public) */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Location (public) */}
        <Route
          path="/location"
          element={
            <Layout>
              <Location />
            </Layout>
          }
        />

        {/* Contact (public) */}
        {/*
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        */}

        {/* FAQ (public) */}
        <Route
          path="/faq"
          element={
            <Layout>
              <PublicFaqPage />
            </Layout>
          }
        />

        {/* ================================================================= */}
        {/* 2) ADMIN‐ONLY ROUTES: all under /admin/* */}
        {/* ================================================================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <AdminLayout>
                <Suspense fallback={<div>Loading admin…</div>}>
                  <Routes>
                    {/* /admin (dashboard) */}
                    <Route index element={<AdminPage />} />

                    {/* /admin/faq (FAQ editor) */}
                    <Route path="faq" element={<FaqPage />} />

                    {/*
                    /admin/projects (project gallery editor) - commented out for now
                    <Route path="projects" element={<ProjectGalleryPage />} />
                    */}

                    {/* If someone visits /admin/anything‐else, redirect to /admin */}
                    <Route
                      path="*"
                      element={<Navigate to="/admin" replace />}
                    />
                  </Routes>
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ================================================================= */}
        {/* 3) CATCH‐ALL: redirect unknown URLs to “/” */}
        {/* ================================================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
