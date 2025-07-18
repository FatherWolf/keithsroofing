// src/components/Layout.tsx
import React from 'react';
import { NavBar } from './NavBar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
