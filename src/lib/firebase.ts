
// This configuration is kept in case other Firebase services (e.g., Firestore, Storage)
// are intended to be used in the future. If not, this file and the .env variables
// related to Firebase can be removed.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Helper function to check if Firebase config is minimally set for non-auth services
export const isFirebaseCoreConfigured = () => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.authDomain && !!firebaseConfig.projectId;
};

// Firebase app initialization (initializeApp, getApp, getApps) has been removed
// to avoid a hard dependency on the 'firebase' package if it's not installed,
// particularly since Firebase authentication features were removed.
// If you re-add Firebase services that require the app object, you'll need to:
// 1. Ensure the 'firebase' package is in your package.json dependencies.
// 2. Uncomment and use the initialization logic like below:
/*
import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
let app;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  // Ensure FirebaseOptions type is used correctly if you re-enable this
  const typedConfig: FirebaseOptions = firebaseConfig;
  app = !getApps().length ? initializeApp(typedConfig) : getApp();
} else {
  console.warn("Firebase config is missing or incomplete. Firebase app object will not be initialized.");
}
export { app }; // Export 'app' if needed by other Firebase services
*/

// For now, no 'app' is exported to prevent errors.
