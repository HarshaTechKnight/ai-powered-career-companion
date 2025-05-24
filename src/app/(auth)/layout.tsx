import { MainHeader } from '@/components/layout/MainHeader';
import { siteConfig } from '@/config/site';
import { Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
            <Link href="/" className="mb-8 flex items-center justify-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">{siteConfig.name}</span>
            </Link>
          {children}
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t text-center">
        <p className="text-xs text-foreground/70">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
