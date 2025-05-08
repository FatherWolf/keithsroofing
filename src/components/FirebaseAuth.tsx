// src/components/FirebaseAuth.tsx
import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';

export default function FirebaseAuth() {
  useEffect(() => {
    // Try to reuse the existing instance
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
    });

    // Clean up the widget (removes event handlers & UI)
    return () => {
      ui.reset();
    };
  }, []);

  return <div id="firebaseui-auth-container" />;
}
