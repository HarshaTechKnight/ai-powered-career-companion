
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

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isSubmittingSocial, setIsSubmittingSocial] = React.useState<null | 'google' | 'linkedin'>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    // Replace with actual email/password login logic
    console.log(values);
    toast({
      title: "Login Submitted (Demo)",
      description: "Email/Password login is for demo purposes. Try social login!",
    });
    // Example: router.push('/dashboard');
  }

  const handleSocialLogin = async (provider: AuthProvider, providerName: 'google' | 'linkedin') => {
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
        title: "Login Successful!",
        description: `Welcome back, ${user.displayName || user.email}!`,
      });
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (error: any) {
      console.error("Social login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred during social login.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSocial(null);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>
          Enter your credentials or use a social account to access KarmaMatch.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleSocialLogin(googleProvider, 'google')}
            disabled={!!isSubmittingSocial}
            className="w-full"
          >
            {isSubmittingSocial === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
            Sign in with Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSocialLogin(linkedInProvider, 'linkedin')}
            disabled={!!isSubmittingSocial}
            className="w-full"
          >
            {isSubmittingSocial === 'linkedin' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Linkedin className="mr-2 h-4 w-4" />}
            Sign in with LinkedIn
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled={!!isSubmittingSocial} />
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
                    <Input type="password" placeholder="••••••••" {...field} disabled={!!isSubmittingSocial} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !!isSubmittingSocial}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm">
          <Link href="/forgot-password" passHref className="text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" passHref className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
