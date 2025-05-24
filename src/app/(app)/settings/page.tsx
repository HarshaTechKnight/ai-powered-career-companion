
"use client"; // Add this directive

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Shield, Bell, FileText, Edit3, Trash2, CheckCircle, PlusCircle, UploadCloud, Star } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import type { UserProfile, StoredResume } from '@/types'; // Assuming StoredResume is defined
import { Badge } from '@/components/ui/badge';

// Mock data - replace with actual data fetching and state management
const userProfile: UserProfile = {
  id: 'user123',
  fullName: 'Aishwarya Sharma',
  email: 'aishwarya.sharma@example.com',
  headline: 'Aspiring AI Ethicist & Data Scientist with a passion for responsible innovation.',
};

const resumes: StoredResume[] = [
  {
    id: 'resume001',
    fileName: 'AI_Ethics_Specialist_Resume.pdf',
    uploadDate: '2024-07-20',
    isPrimary: true,
    skills: ['Python', 'Machine Learning', 'Ethics in AI', 'Data Analysis', 'NLP'],
    experience: [{ jobTitle: 'AI Research Intern', company: 'Future AI Labs', duration: '6 months' }],
    education: [{ degree: 'M.Sc. Data Science', institution: 'University of Advanced Tech' }],
    atsScore: 88,
  },
  {
    id: 'resume002',
    fileName: 'General_Tech_CV.docx',
    uploadDate: '2024-07-15',
    skills: ['JavaScript', 'React', 'Node.js', 'Project Management'],
    experience: [{ jobTitle: 'Junior Developer', company: 'Web Solutions', duration: '1.5 years' }],
    education: [{ degree: 'B.Tech Computer Science', institution: 'State University' }],
    atsScore: 75,
  },
];
// End Mock Data

export default function SettingsPage() {
  // Mock actions - in a real app, these would call APIs
  const handleSetPrimary = (resumeId: string) => {
    alert(`Mock action: Set resume ${resumeId} as primary.`);
    // Logic to update resume's isPrimary status
  };

  const handleDeleteResume = (resumeId: string) => {
    if (confirm(`Mock action: Are you sure you want to delete resume ${resumeId}?`)) {
      alert(`Mock action: Resume ${resumeId} deleted.`);
      // Logic to delete resume
    }
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-6 w-6 text-primary" />
            My Profile
          </CardTitle>
          <CardDescription>Update your personal details and professional headline.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={userProfile.fullName} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={userProfile.email} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="headline">Profile Headline</Label>
            <Textarea 
              id="headline" 
              placeholder="e.g., Experienced Software Engineer | React & Node.js Expert" 
              defaultValue={userProfile.headline}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">A brief introduction that appears on your profile.</p>
          </div>
          <Button>Save Profile Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              My Resumes
            </CardTitle>
            <CardDescription>Manage your uploaded resumes. Set one as primary for quick applications.</CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/resume-scanner"><UploadCloud className="mr-2 h-4 w-4" /> Upload New Resume</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {resumes.length > 0 ? (
            <ul className="space-y-4">
              {resumes.map((resume) => (
                <li key={resume.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                       <p className="font-semibold text-lg">{resume.fileName}</p>
                       {resume.isPrimary && <Badge variant="default" className="text-xs"><Star className="mr-1 h-3 w-3 fill-current" /> Primary</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">Uploaded: {resume.uploadDate} | ATS Score: {resume.atsScore}%</p>
                    <p className="text-xs text-muted-foreground truncate">Skills: {resume.skills.slice(0,5).join(', ')}{resume.skills.length > 5 ? '...' : ''}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 sm:mt-0 flex-shrink-0">
                    {!resume.isPrimary && (
                      <Button variant="outline" size="sm" onClick={() => handleSetPrimary(resume.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Set Primary
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                       <Link href={`/resume-scanner?resumeId=${resume.id}&fileName=${encodeURIComponent(resume.fileName)}`} title="View/Re-analyze"> {/* Pass filename for display */}
                        <Edit3 className="mr-2 h-4 w-4" /> Analyze
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No Resumes Yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Upload your first resume to get started with AI analysis and job matching.</p>
              <Button asChild className="mt-6">
                <Link href="/resume-scanner"><PlusCircle className="mr-2 h-4 w-4" /> Upload & Analyze Resume</Link>
              </Button>
            </div>
          )}
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
          <p className="text-sm text-muted-foreground">Email notifications for new job matches (Enabled)</p>
          <Button variant="outline">Manage Notifications (Mock)</Button>
        </CardContent>
      </Card>

    </div>
  );
}
