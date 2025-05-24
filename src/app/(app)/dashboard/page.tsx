
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Briefcase, Edit3, PlusCircle, Trash2, ScanText, SearchCode, User, Target, TrendingUp, Brain, AlertTriangle, Award, Settings as SettingsIcon, Eye } from 'lucide-react';
import Link from 'next/link';
import type { UserProfile, JobApplication, StoredResume } from '@/types';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your KarmaMatch profile, resumes, and job applications.',
};

// --- Mock Data ---
const userProfile: UserProfile = {
  id: 'user123',
  fullName: 'Aishwarya Sharma',
  email: 'aishwarya.sharma@example.com',
  headline: 'Aspiring AI Ethicist & Data Scientist',
};

const resumes: StoredResume[] = [
  {
    id: 'resume001',
    fileName: 'AI_Ethics_Specialist_Resume.pdf',
    uploadDate: '2024-07-20',
    isPrimary: true,
    skills: ['Python', 'Machine Learning', 'Ethics in AI', 'Data Analysis', 'NLP', 'Research', 'Critical Thinking'],
    experience: [
      { jobTitle: 'AI Research Intern', company: 'Future AI Labs', duration: '6 months' },
      { jobTitle: 'Data Analyst Assistant', company: 'Insight Corp', duration: '1 year' }
    ],
    education: [{ degree: 'M.Sc. Data Science', institution: 'University of Advanced Tech' }],
    atsScore: 88,
  },
  {
    id: 'resume002',
    fileName: 'General_Tech_CV.docx',
    uploadDate: '2024-07-15',
    skills: ['JavaScript', 'React', 'Node.js', 'Project Management', 'Communication'],
    experience: [{ jobTitle: 'Junior Developer', company: 'Web Solutions', duration: '1.5 years' }],
    education: [{ degree: 'B.Tech Computer Science', institution: 'State University' }],
    atsScore: 75,
  },
];

const jobApplications: JobApplication[] = [
  { id: 'app001', jobTitle: 'AI Ethics Researcher', company: 'Ethica AI', status: 'Interviewing', dateApplied: '2024-07-22', resumeIdUsed: 'resume001' },
  { id: 'app002', jobTitle: 'Junior Data Scientist', company: 'Data Insights Ltd.', status: 'Applied', dateApplied: '2024-07-18' },
  { id: 'app003', jobTitle: 'Frontend Developer', company: 'Creative Web', status: 'Saved', dateApplied: '2024-07-10' },
];

const aiMatchInsights = {
  bestFitCount: 3, // Based on primary resume
  stretchRoleCount: 8,
};

const mockRecommendedJobs = [
  { id: 'rec001', title: 'AI Policy Analyst', company: 'GovTech Institute', relevance: '92%' },
  { id: 'rec002', title: 'Responsible AI Developer', company: 'Innovate AI', relevance: '88%' },
  { id: 'rec003', title: 'Data Ethics Consultant', company: 'Principled Data', relevance: '85%' },
];
// --- End Mock Data ---

export default function DashboardPage() {
  const profileCompletion = userProfile.headline && resumes.some(r => r.isPrimary) ? 90 : 60; // Example percentage
  const primaryResume = resumes.find(r => r.isPrimary);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userProfile.fullName.split(' ')[0]}!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompletion}%</div>
            <Progress value={profileCompletion} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {profileCompletion < 100 ? "Complete your profile for better matches." : "Profile looks great!"}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stored Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground truncate">
              Primary: {primaryResume?.fileName || 'Not set'}
            </p>
          </CardContent>
           <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings"><SettingsIcon className="mr-2 h-4 w-4" /> Manage Resumes</Link>
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
              Total applications: {jobApplications.length}
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
            <CardDescription>Overview of your stored resumes. Manage them in Settings.</CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length > 0 ? (
              <ul className="space-y-3">
                {resumes.map((resume) => (
                  <li key={resume.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{resume.fileName} {resume.isPrimary && <Badge variant="outline" className="ml-2 border-primary text-primary">Primary</Badge>}</p>
                      <p className="text-sm text-muted-foreground">Uploaded: {resume.uploadDate} | ATS: {resume.atsScore}%</p>
                    </div>
                    <div className="space-x-1">
                       <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/resume-scanner?resumeId=${resume.id}`} title="View/Analyze (mock)"> 
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href="/settings" title="Manage Resumes">
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No resumes uploaded yet.</p>
                <Button asChild className="mt-4">
                  <Link href="/resume-scanner"><PlusCircle className="mr-2 h-4 w-4" /> Upload & Analyze First Resume</Link>
                </Button>
              </div>
            )}
             {resumes.length > 0 && (
                <Button variant="link" asChild className="mt-4 p-0 h-auto">
                    <Link href="/settings">Manage all resumes in Settings <SettingsIcon className="ml-1 h-4 w-4" /></Link>
                </Button>
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
                  {jobApplications.slice(0, 5).map((app) => ( 
                    <TableRow key={app.id}>
                      <TableCell className="font-medium truncate max-w-xs">{app.jobTitle}</TableCell>
                      <TableCell className="truncate max-w-xs">{app.company}</TableCell>
                      <TableCell>
                        <Badge variant={
                          app.status === 'Interviewing' ? 'default' :
                          app.status === 'Applied' ? 'secondary' :
                          app.status === 'Offer' ? 'default' : 
                          app.status === 'Saved' ? 'outline' :
                          'destructive'
                        } className={app.status === 'Offer' ? 'bg-green-500 text-white hover:bg-green-600' : ''}>
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

      {/* Enhanced Insights Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              AI Match Insights
            </CardTitle>
            <CardDescription>Potential based on your primary resume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-500" />
                <p>Best Fit Jobs Identified</p>
              </div>
              <p className="font-bold text-lg">{primaryResume ? aiMatchInsights.bestFitCount : 'N/A'}</p>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <p>Stretch Roles Explored</p>
              </div>
              <p className="font-bold text-lg">{primaryResume ? aiMatchInsights.stretchRoleCount : 'N/A'}</p>
            </div>
             <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/job-matcher">Explore more job matches <SearchCode className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Key Skills
            </CardTitle>
            <CardDescription>Top skills from your primary resume.</CardDescription>
          </CardHeader>
          <CardContent>
            {primaryResume && primaryResume.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {primaryResume.skills.slice(0, 10).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                ))}
                {primaryResume.skills.length > 10 && <Badge variant="outline">+{primaryResume.skills.length - 10} more</Badge>}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                <p>{primaryResume ? "No skills extracted from primary resume." : "No primary resume set."}</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/settings">Set or Scan a Primary Resume</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Recommended Jobs
            </CardTitle>
            <CardDescription>AI suggestions based on your primary resume.</CardDescription>
          </CardHeader>
          <CardContent>
            {primaryResume ? (
              <>
                <ul className="space-y-3">
                  {mockRecommendedJobs.slice(0,3).map((job, index) => (
                    <li key={job.id + index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.company} - <span className="text-xs text-primary">{job.relevance} Match</span></p>
                      </div>
                       <Button variant="outline" size="sm" asChild>
                        <Link href={`/job-matcher?mockJobId=${job.id}`}>View</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button variant="link" asChild className="p-0 h-auto mt-4">
                  <Link href="/job-matcher">Explore All Recommendations <SearchCode className="ml-1 h-4 w-4" /></Link>
                </Button>
              </>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                <p>Set a primary resume to get personalized job recommendations.</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/settings">Manage Resumes</Link>
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
            <Link href="/settings">
              <User className="h-8 w-8 mb-2 text-primary" />
              <span>Update Profile</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
