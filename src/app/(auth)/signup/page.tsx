import { SignupForm } from '@/components/auth/SignupForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your KarmaMatch account.',
};

export default function SignupPage() {
  return <SignupForm />;
}
