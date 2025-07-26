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

    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          // Force popup mode
          customParameters: {
            prompt: 'select_account'
          }
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl?: string) => {
          // Don't redirect automatically, let React Router handle it
          return false;
        },
        uiShown: () => {
          // Hide the loading screen
          const loader = document.getElementById('firebaseui-loading');
          if (loader) {
            loader.style.display = 'none';
          }
        }
      },
      // Ensure popup behavior
      popupMode: true,
      tosUrl: () => {
        // Terms of service URL - you can customize this
      },
      privacyPolicyUrl: () => {
        // Privacy policy URL - you can customize this
      }
    };

    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      ui.reset();
    };
  }, []);

  return (
    <>
      <div id="firebaseui-loading" style={{ textAlign: 'center', padding: '20px' }}>
        Loading authentication...
      </div>
      <div id="firebaseui-auth-container" />
    </>
  );
}
