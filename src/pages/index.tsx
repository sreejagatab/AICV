import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, FileText, Zap, Star, Users } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  return (
    <>
      <Head>
        <title>AI Resume Builder - Create Professional Resumes</title>
        <meta name="description" content="Generate professional resumes with AI. Our resume builder helps you create impressive resumes tailored to your experience and career goals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="AI Resume Builder - Create Professional Resumes" />
        <meta property="og:description" content="Generate professional resumes with AI. Our resume builder helps you create impressive resumes tailored to your experience and career goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-resume-builder.com" />
        <meta property="og:image" content="/images/resume-builder-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Resume Builder - Create Professional Resumes" />
        <meta name="twitter:description" content="Generate professional resumes with AI. Our resume builder helps you create impressive resumes tailored to your experience and career goals." />
      </Head>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between py-4">
            <Logo />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login" passHref>
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Create Professional Resumes with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Generate tailored, professional resumes in minutes. Stand out from the crowd with our AI-powered resume builder.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup" passHref>
                  <Button size="lg" className="h-12 px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#pricing" passHref>
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from a variety of professional templates designed for different industries and career levels.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">AI-Powered Content</h3>
                <p className="text-muted-foreground">
                  Our AI helps you craft compelling content that highlights your skills and experience effectively.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Multi-Language Support</h3>
                <p className="text-muted-foreground">
                  Create resumes in multiple languages to apply for international positions with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that works best for you. All plans include access to our AI-powered resume builder.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Free Trial</CardTitle>
                  <CardDescription>Try before you buy</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">£0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>1 month access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic templates</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Watermarked exports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Limited to 1 resume</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup?plan=free" passHref className="w-full">
                    <Button variant="outline" className="w-full">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Standard Plan */}
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-fit mb-2">
                    POPULAR
                  </div>
                  <CardTitle>Standard</CardTitle>
                  <CardDescription>For active job seekers</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">£10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>30 resumes per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>All basic templates</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>No watermarks</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>PDF & HTML exports</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup?plan=standard" passHref className="w-full">
                    <Button className="w-full">
                      Subscribe Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For professionals</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">£25</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited resumes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>All premium templates</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced customization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup?plan=premium" passHref className="w-full">
                    <Button variant="outline" className="w-full">
                      Subscribe Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                What Our Users Say
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      "I landed my dream job thanks to the professional resume created with this tool. The AI suggestions were spot on!"
                    </p>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Marketing Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      "The templates are modern and professional. I received compliments on my resume from multiple recruiters."
                    </p>
                    <div>
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                      "As a career coach, I recommend this tool to all my clients. It saves time and produces quality resumes every time."
                    </p>
                    <div>
                      <p className="font-semibold">Emma Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Career Coach</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Create Your Professional Resume?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of job seekers who have successfully landed interviews with our AI-powered resume builder.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup" passHref>
                  <Button size="lg" className="h-12 px-8">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}