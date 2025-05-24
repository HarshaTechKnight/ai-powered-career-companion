
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Chrome, Linkedin, Loader2 } from "lucide-react";
import { auth, googleProvider, linkedInProvider, isFirebaseConfigured } from "@/lib/firebase"; // Import Firebase auth and providers
import { signInWithPopup, type AuthProvider, UserCredential } from "firebase/auth";
import React from "react";

const signupFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export function SignupForm() {
  const router = useRouter();
  const [isSubmittingSocial, setIsSubmittingSocial] = React.useState<null | 'google' | 'linkedin'>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    // Replace with actual email/password signup logic
    console.log(values);
    toast({
      title: "Signup Submitted (Demo)",
      description: "Email/Password signup is for demo. Try social sign up!",
    });
    // Example: router.push('/dashboard');
  }

  const handleSocialSignup = async (provider: AuthProvider, providerName: 'google' | 'linkedin') => {
    if (!isFirebaseConfigured()) {
      toast({
        title: "Firebase Not Configured",
        description: (
          <span>
            Please set up your Firebase environment variables.{" "}
            <Link href="/firebase-config-notice" className="underline text-primary">Learn more</Link>.
          </span>
        ),
        variant: "destructive",
        duration: 10000,
      });
      return;
    }
    setIsSubmittingSocial(providerName);
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      toast({
        title: "Sign Up Successful!",
        description: `Welcome, ${user.displayName || user.email}! Your account is created.`,
      });
      // Potentially save additional user info to your backend here
      router.push('/dashboard'); // Redirect to dashboard
    } catch (error: any) {
      console.error("Social signup error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message || "An unexpected error occurred during social sign up.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSocial(null);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join KarmaMatch quickly using a social account or with your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleSocialSignup(googleProvider, 'google')}
            disabled={!!isSubmittingSocial}
            className="w-full"
          >
            {isSubmittingSocial === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
            Sign up with Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSocialSignup(linkedInProvider, 'linkedin')}
            disabled={!!isSubmittingSocial}
            className="w-full"
          >
            {isSubmittingSocial === 'linkedin' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Linkedin className="mr-2 h-4 w-4" />}
            Sign up with LinkedIn
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or create an account with email
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} disabled={!!isSubmittingSocial}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled={!!isSubmittingSocial}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={!!isSubmittingSocial}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={!!isSubmittingSocial}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !!isSubmittingSocial}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" passHref className="text-primary hover:underline">
            Terms of Service
          </Link>.
        </div>
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" passHref className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
