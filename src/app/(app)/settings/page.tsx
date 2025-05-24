import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Shield, Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your KarmaMatch account settings.',
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-6 w-6 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal details and profile visibility.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Aishwarya Sharma" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="aishwarya.sharma@example.com" disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="headline">Profile Headline</Label>
            <Input id="headline" placeholder="e.g., Experienced Software Engineer | React & Node.js Expert" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Account Security
          </CardTitle>
          <CardDescription>Manage your password and account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" asChild>
            <Link href="/settings/change-password">Change Password</Link>
          </Button>
          {/* Placeholder for 2FA settings */}
          <p className="text-sm text-muted-foreground">Two-Factor Authentication (Coming Soon)</p>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how you receive notifications from KarmaMatch.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Placeholder for notification settings */}
          <p className="text-sm text-muted-foreground">Email notifications for new job matches (Enabled)</p>
          <Button variant="outline">Manage Notifications</Button>
        </CardContent>
      </Card>

    </div>
  );
}
