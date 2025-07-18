// src/App.tsx
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import HomePage from './pages/HomePage';
import LocationPage from './pages/Location';
import ContactFormPage from './pages/ContactFormPage';
import FaqPage from './pages/FaqPage';
import AdminPage from './pages/AdminPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<FaqPage />} />{' '}
          {/* ← render FaqPage at /gallery */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route
          path="admin/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="gallery" element={<FaqPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
