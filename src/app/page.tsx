import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { Briefcase, Lightbulb, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Find Your Destined Career Path with KarmaMatch
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Leverage AI to scan your resume, match with the perfect jobs, and take control of your professional journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="shadow-sm hover:shadow-md transition-shadow">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="KarmaMatch Hero Image"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-xl"
                data-ai-hint="career success abstract"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Career Potential</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  KarmaMatch offers cutting-edge tools to streamline your job search and connect you with opportunities that truly resonate with your profile.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none pt-12">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Briefcase className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>AI Resume Scanner</CardTitle>
                  <CardDescription>Upload your resume and let our AI extract skills, experience, and education in seconds.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Supports PDF and DOCX formats for seamless integration.</p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Intelligent Job Matcher</CardTitle>
                  <CardDescription>Discover "Best Fit" and "Stretch Roles" with AI-powered job ranking based on your unique profile.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Filter by salary, location, and experience to find your perfect match.</p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Personalized Dashboard</CardTitle>
                  <CardDescription>Manage your profile, track applications, and upload multiple resumes all in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Stay organized and focused on your career goals.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to find your karma in your career?</h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join KarmaMatch today and let us guide you to your next big opportunity.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <p className="text-xs text-foreground/60">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-2 text-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-foreground/70">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/70">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/70">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
