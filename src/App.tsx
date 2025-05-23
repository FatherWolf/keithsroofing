// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import HomePage from './pages/HomePage';
import Location from './pages/Location';
import AdminPage from './pages/AdminPage';

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
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
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
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQPage />
            </Layout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute redirectTo="/login">
              <AdminLayout>
                <Suspense fallback={<div>Loading admin tools…</div>}>
                  <AdminPage />
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
