// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Location from './pages/Location';
// import ContactPage from './pages/ContactPage'; // Not implemented yet
import PublicFaqPage from './pages/PublicFaqPage';
import AdminPage from './pages/AdminPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public login */}
        <Route path="/login" element={<Login />} />

        {/* Public routes */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Location />
            </Layout>
          }
        />
        <Route
          path="/location"
          element={
            <Layout>
              <Location />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <PublicFaqPage />
            </Layout>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <AdminLayout>
                <Routes>
                  <Route index element={<AdminPage />} />
                  <Route path="faq" element={<FaqPage />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
