import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Briefcase, CheckCircle, Edit3, PlusCircle, Trash2, ScanText, SearchCode } from 'lucide-react';
import Link from 'next/link';
import type { UserProfile, JobApplication, StoredResume } from '@/types';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your KarmaMatch profile, resumes, and job applications.',
};

// Mock data - replace with actual data fetching
const userProfile: UserProfile = {
  id: 'user123',
  fullName: 'Aishwarya Sharma',
  email: 'aishwarya.sharma@example.com',
};

const resumes: StoredResume[] = [
  {
    id: 'resume001',
    fileName: 'Software_Engineer_Resume.pdf',
    uploadDate: '2024-07-15',
    isPrimary: true,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    experience: [{ jobTitle: 'Frontend Developer', company: 'Tech Solutions Inc.', duration: '2 years' }],
    education: [{ degree: 'B.Tech Computer Science', institution: 'IIT Delhi' }],
  },
  {
    id: 'resume002',
    fileName: 'Project_Manager_CV.docx',
    uploadDate: '2024-06-20',
    skills: ['Agile', 'Scrum', 'JIRA', 'Project Planning'],
    experience: [{ jobTitle: 'Project Coordinator', company: 'Innovate Hub', duration: '3 years' }],
    education: [{ degree: 'MBA', institution: 'IIM Bangalore' }],
  },
];

const jobApplications: JobApplication[] = [
  { id: 'app001', jobTitle: 'Senior React Developer', company: 'FutureTech', status: 'Interviewing', dateApplied: '2024-07-10' },
  { id: 'app002', jobTitle: 'Cloud Solutions Architect', company: 'SkyHigh Cloud', status: 'Applied', dateApplied: '2024-07-05' },
  { id: 'app003', jobTitle: 'UX Designer', company: 'Creative Minds', status: 'Rejected', dateApplied: '2024-06-28' },
];


export default function DashboardPage() {
  const profileCompletion = 75; // Example percentage

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userProfile.fullName.split(' ')[0]}!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <UserEditIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompletion}%</div>
            <Progress value={profileCompletion} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Complete your profile for better job matches.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings/profile"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploaded Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground">
              {resumes.find(r => r.isPrimary)?.fileName || 'No primary resume set'}
            </p>
          </CardContent>
           <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/resume-scanner"><PlusCircle className="mr-2 h-4 w-4" /> Manage Resumes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobApplications.filter(app => app.status === 'Applied' || app.status === 'Interviewing').length}</div>
            <p className="text-xs text-muted-foreground">
              Keep track of your job prospects.
            </p>
          </CardContent>
           <CardFooter>
             <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/applications"><Briefcase className="mr-2 h-4 w-4" /> View Applications</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
            <CardDescription>Manage your uploaded resumes. Set a primary resume for quick applications.</CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length > 0 ? (
              <ul className="space-y-3">
                {resumes.map((resume) => (
                  <li key={resume.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{resume.fileName} {resume.isPrimary && <Badge variant="outline" className="ml-2 border-primary text-primary">Primary</Badge>}</p>
                      <p className="text-sm text-muted-foreground">Uploaded: {resume.uploadDate}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No resumes uploaded yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/resume-scanner"><PlusCircle className="mr-2 h-4 w-4" /> Upload Resume</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Job Applications</CardTitle>
            <CardDescription>Overview of your recent job application statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            {jobApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.slice(0, 5).map((app) => ( // Show top 5
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.jobTitle}</TableCell>
                      <TableCell>{app.company}</TableCell>
                      <TableCell>
                        <Badge variant={
                          app.status === 'Interviewing' ? 'default' :
                          app.status === 'Applied' ? 'secondary' :
                          app.status === 'Offer' ? 'default' : // Success variant would be good here
                          'destructive'
                        } className={app.status === 'Offer' ? 'bg-green-500 text-white' : ''}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.dateApplied}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
               <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No job applications yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/job-matcher"><SearchCode className="mr-2 h-4 w-4" /> Find Jobs</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" size="lg" asChild className="flex flex-col h-auto p-6 items-center justify-center text-center space-y-2">
            <Link href="/resume-scanner">
              <ScanText className="h-8 w-8 mb-2 text-primary" />
              <span>Scan New Resume</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="flex flex-col h-auto p-6 items-center justify-center text-center space-y-2">
            <Link href="/job-matcher">
              <SearchCode className="h-8 w-8 mb-2 text-primary" />
              <span>Match Jobs</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="flex flex-col h-auto p-6 items-center justify-center text-center space-y-2">
            <Link href="/settings/profile">
              <UserEditIcon className="h-8 w-8 mb-2 text-primary" />
              <span>Update Profile</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}

// Placeholder icon, replace if you have a specific one
function UserEditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}
