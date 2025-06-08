// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// -- Layouts & Authentication
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// -- Pages
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Location from './pages/Location';
// import ContactPage from "./pages/ContactPage"; // Not built yet, so commented out
import PublicFaqPage from './pages/PublicFaqPage';
import AdminPage from './pages/AdminPage';
import FaqPage from './pages/FaqPage';

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

        {/* Contact (public)—uncomment once you create ContactPage.tsx */}
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
        {/* 2) ADMIN‐ONLY ROUTES (under /admin/*) */}
        {/* ================================================================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <AdminLayout>
                <Routes>
                  {/* /admin (dashboard) */}
                  <Route index element={<AdminPage />} />

                  {/* /admin/faq (FAQ editor) */}
                  <Route path="faq" element={<FaqPage />} />

                  {/* Any other /admin/* → redirect back to /admin */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
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
