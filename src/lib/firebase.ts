
import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
// Note: LinkedIn via Firebase directly is tricky due to LinkedIn API restrictions.
// Firebase typically uses generic OAuthProvider for services like LinkedIn.
// For this example, we'll prepare for a generic OAuth provider which you'd configure for LinkedIn in Firebase console.
// Or, if LinkedIn is a direct provider in your Firebase SDK version / project setup, you can use that.
// Let's assume a generic OAuth setup for LinkedIn for now.
const linkedInProvider = new OAuthProvider('linkedin.com'); // This ID might vary based on Firebase setup


// Helper function to check if Firebase config is minimally set
export const isFirebaseConfigured = () => {
  return !!firebaseConfig.apiKey && !!firebaseConfig.authDomain && !!firebaseConfig.projectId;
};

export { app, auth, googleProvider, linkedInProvider, firebaseConfig };
