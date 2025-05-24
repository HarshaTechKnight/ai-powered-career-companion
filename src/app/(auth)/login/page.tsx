import { LoginForm } from '@/components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your KarmaMatch account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
