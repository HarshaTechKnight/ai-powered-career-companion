
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { Briefcase, Lightbulb, Zap, Users, CheckCircle, DollarSign, Quote, Star, Mail, Phone, Linkedin, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const features = [
    {
      icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
      title: "AI Resume Scanner",
      description: "Upload your resume and let our AI extract skills, experience, and education in seconds. Supports PDF and DOCX formats.",
      link: "/resume-scanner"
    },
    {
      icon: <Zap className="h-10 w-10 text-primary mb-4" />,
      title: "Intelligent Job Matcher",
      description: "Discover 'Best Fit' and 'Stretch Roles' with AI-powered job ranking based on your unique profile.",
      link: "/job-matcher"
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: "Personalized Dashboard",
      description: "Manage your profile, track applications, and get tailored insights to navigate your career path effectively.",
      link: "/dashboard"
    }
  ];

  const services = [
    {
      title: "Comprehensive Resume Analysis",
      description: "Our AI delves deep into your resume, identifying key skills, experiences, and educational background to build a strong foundation for your job search.",
      icon: <ScanText className="h-8 w-8 text-accent" />
    },
    {
      title: "Precision Job Matching",
      description: "We go beyond keywords. Our intelligent algorithms match your profile to job descriptions, highlighting roles that truly fit your expertise and growth potential.",
      icon: <SearchCode className="h-8 w-8 text-accent" />
    },
    {
      title: "Career Path Insights",
      description: "Gain valuable insights into potential career trajectories, identify skill gaps, and understand what it takes to reach your next professional milestone.",
      icon: <TrendingUp className="h-8 w-8 text-accent" />
    }
  ];

  const pricingPlans = [
    {
      name: "Seeker",
      price: "Free",
      features: ["Basic Resume Scan (1/month)", "Limited Job Matches", "Profile Management"],
      cta: "Get Started for Free"
    },
    {
      name: "Navigator",
      price: "$19",
      period: "/month",
      features: ["Unlimited Resume Scans", "Advanced Job Matching", "AI Career Insights", "Priority Support"],
      cta: "Choose Navigator",
      popular: true,
    },
    {
      name: "Visionary",
      price: "$49",
      period: "/month",
      features: ["All Navigator Features", "Personalized Coaching (1 session)", "Network Building Tools", "Early Access to New Features"],
      cta: "Become a Visionary"
    }
  ];

  const testimonials = [
    {
      quote: "KarmaMatch transformed my job search! The AI insights were spot on and helped me land my dream job in weeks.",
      name: "Priya V.",
      role: "Software Engineer",
      avatar: "https://placehold.co/100x100.png?text=PV"
    },
    {
      quote: "The resume scanner is incredibly accurate. I finally understand how to present my skills effectively.",
      name: "Raj K.",
      role: "Marketing Manager",
      avatar: "https://placehold.co/100x100.png?text=RK"
    },
    {
      quote: "I was stuck in my career. KarmaMatch showed me 'stretch roles' I hadn't considered and gave me the confidence to apply.",
      name: "Aisha B.",
      role: "UX Designer",
      avatar: "https://placehold.co/100x100.png?text=AB"
    }
  ];

  // Dynamically get social icons from lucide-react
  const SocialIcon = ({ name }: { name: string }) => {
    const IconComponent = {
      Facebook,
      Twitter,
      Instagram,
      Linkedin,
    }[name] || Briefcase; // Fallback icon
    return <IconComponent className="h-5 w-5" />;
  };


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Find Your Destined Career Path with KarmaMatch
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Leverage AI to scan your resume, match with the perfect jobs, and confidently navigate your professional journey.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                    <Link href="/signup">Get Started Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="shadow-sm hover:shadow-md transition-shadow">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x500.png"
                alt="KarmaMatch AI assisting with career path"
                width={600}
                height={500}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                data-ai-hint="career guidance future"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <Image
                src="https://placehold.co/550x450.png"
                alt="KarmaMatch Team Collaboration"
                width={550}
                height={450}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-xl"
                data-ai-hint="diverse team working"
              />
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">About KarmaMatch</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Guiding Your Career Journey, Intelligently</h2>
                <p className="text-foreground/80 md:text-lg">
                  At KarmaMatch, we believe everyone deserves a fulfilling career. Traditional job hunting can be overwhelming and often feels like a game of chance. We're changing that by harnessing the power of AI to provide personalized, insightful, and effective tools for job seekers.
                </p>
                <p className="text-foreground/80 md:text-lg">
                  Our mission is to empower you with the clarity and confidence to find not just a job, but a career path that aligns with your true potential and aspirations.
                </p>
                <Button asChild variant="link" className="px-0 text-primary hover:text-primary/80">
                  <Link href="#contact">Meet Our Team (Concept) <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">Our Services</div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How We Help You Succeed</h2>
              <p className="max-w-[700px] text-foreground/80 md:text-lg">
                KarmaMatch provides a suite of AI-powered services designed to streamline your job search and maximize your potential.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center text-center">
                    {service.icon}
                    <CardTitle className="mt-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground text-center">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - (Kept similar to original, but can be enhanced) */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Unlock Your Career Potential</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-lg">
                KarmaMatch offers cutting-edge tools to streamline your job search and connect you with opportunities that truly resonate.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                     <Button variant="outline" asChild>
                       <Link href={feature.link}>Explore Feature</Link>
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">Pricing Plans</div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Find the Perfect Plan for You</h2>
              <p className="max-w-[700px] text-foreground/80 md:text-lg">
                Simple, transparent pricing to help you on your career journey. No hidden fees.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${plan.popular ? 'border-primary border-2 relative' : ''}`}>
                  {plan.popular && <div className="absolute top-0 right-4 -mt-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">POPULAR</div>}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-4xl font-bold text-primary mt-2">
                      {plan.price}
                      {plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Quote className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Professionals Like You</h2>
              <p className="max-w-[700px] text-foreground/80 md:text-lg">
                Hear what our users are saying about their KarmaMatch experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg_ hover:shadow-xl_ transition-shadow_ duration-300_ bg-card p-6 rounded-lg">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="portrait professional" />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Final CTA Section */}
        <section id="contact" className="w-full py-16 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight">Ready to Find Your Karma in Your Career?</h2>
              <p className="text-foreground/80 md:text-xl">
                Join KarmaMatch today and let our AI-powered platform guide you to your next big opportunity. Your ideal career path awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                  <Link href="/signup">Sign Up for Free</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="mailto:support@karmamatch.example.com">Contact Support</Link>
                </Button>
              </div>
               <p className="text-xs text-foreground/60 pt-4">
                Have questions? Reach out to us at <a href="mailto:info@karmamatch.example.com" className="underline hover:text-primary">info@karmamatch.example.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Creative Footer */}
      <footer className="bg-muted/70 text-foreground/80 border-t">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Link href="/" className="inline-flex items-center mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold tracking-wide text-foreground">{siteConfig.name}</span>
              </Link>
              <p className="text-sm">
                {siteConfig.description}
              </p>
              <div className="mt-6 lg:max-w-sm">
                <p className="text-sm font-semibold mb-2">Stay updated</p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input type="email" placeholder="Enter your email" className="flex-grow" />
                  <Button type="submit" variant="default">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  Get the latest news and updates from KarmaMatch. No spam, ever.
                </p>
              </div>
            </div>

            {siteConfig.footerLinks.map((group) => (
              <div key={group.title}>
                <p className="font-semibold tracking-wide text-foreground mb-3">{group.title}</p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-300 hover:text-primary text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <Separator className="my-8 bg-border" />

          <div className="flex flex-col-reverse justify-between pt-5 pb-5 border-t_ lg:flex-row">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 lg:ml-auto mb-4 lg:mb-0">
              {siteConfig.socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="transition-colors duration-300 hover:text-primary">
                  <SocialIcon name={social.iconName} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icons for services section (if not already imported from lucide-react)
// Need to ensure these are actually available or use alternatives
const ScanText = Briefcase; // Placeholder, replace with actual if available or specific icon
const SearchCode = Zap; // Placeholder
const TrendingUp = Lightbulb; // Placeholder
