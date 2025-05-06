// src/components/FirebaseAuth.tsx
import React from 'react';
import { StyledFirebaseAuth } from 'firebaseui-react';
import { auth, googleProvider } from '../firebase';

const uiConfig = {
  signInFlow: 'popup' as const,
  signInOptions: [googleProvider.providerId],
  callbacks: { signInSuccessWithAuthResult: () => false },
};

export function FirebaseAuth() {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}
