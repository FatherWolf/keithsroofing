// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Checking authentication…</div>;
  if (!user) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
}
