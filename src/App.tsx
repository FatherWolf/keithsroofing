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
import Location from './pages/Location';
// import ContactPage from './pages/ContactPage'; // when you add it
import FaqPage from './pages/FaqPage';
import AdminPage from './pages/AdminPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public login */}
        <Route path="/login" element={<Login />} />

        {/* All public pages share the same Layout wrapper */}
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<HomePage />} />
          {/* swap Location for ContactPage when ready */}
          <Route path="contact" element={<Location />} />
          <Route path="location" element={<Location />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>

        {/* Admin-only area */}
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
          <Route path="faq" element={<FaqPage />} />
        </Route>

        {/* catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
