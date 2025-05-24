import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your KarmaMatch account password.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
