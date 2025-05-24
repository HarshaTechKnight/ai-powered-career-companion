
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { firebaseConfig } from '@/lib/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Firebase Configuration Required',
  description: 'Information on how to configure Firebase for KarmaMatch.',
};

export default function FirebaseConfigNoticePage() {
  const isConfigured = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
            Firebase Configuration Notice
          </CardTitle>
          <CardDescription>
            For social login features to work, you need to set up Firebase for this project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isConfigured ? (
            <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
              <p className="font-semibold">Firebase appears to be configured in your environment variables!</p>
              <p>If you still encounter issues, please double-check the values.</p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-md">
              <p className="font-semibold">Action Required: Configure Firebase</p>
              <p>
                It seems your Firebase environment variables are not set or are incomplete.
              </p>
            </div>
          )}
          
          <p>
            To enable Google, LinkedIn (and other Firebase-supported) sign-in methods, you need to:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Create a Firebase Project:</strong> If you haven&apos;t already, go to the{' '}
              <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Firebase Console
              </a>{' '}
              and create a new project.
            </li>
            <li>
              <strong>Add a Web App:</strong> Within your Firebase project, add a new Web application. Firebase will provide you with a configuration object.
            </li>
            <li>
              <strong>Enable Authentication Methods:</strong> In the Firebase Console, go to Authentication &gt; Sign-in method. Enable Google, and for LinkedIn, you might need to set up a generic OAuth provider (refer to Firebase documentation for specifics).
            </li>
            <li>
              <strong>Update Environment Variables:</strong> Copy the configuration values from your Firebase project settings into your <code>.env</code> file in the root of this project. It should look like this:
            </li>
          </ol>
          <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
            {`NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID`}
          </pre>
          <p>
            After updating your <code>.env</code> file, you&apos;ll need to restart your development server for the changes to take effect.
          </p>
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
