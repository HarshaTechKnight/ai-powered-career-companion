
import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';

// This configuration is kept in case other Firebase services (e.g., Firestore, Storage)
// are intended to be used in the future. If not, this file and the .env variables
// related to Firebase can be removed.
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if config is provided
let app;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} else {
  console.warn("Firebase config is missing. Firebase services will not be initialized.");
}


// Helper function to check if Firebase config is minimally set for non-auth services
export const isFirebaseCoreConfigured = () => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.authDomain && !!firebaseConfig.projectId;
};

export { app }; // Exporting app in case other Firebase services are added later.
