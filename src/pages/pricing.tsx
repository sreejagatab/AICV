import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();

  const handleUpgrade = async (plan: 'standard' | 'premium') => {
    if (!user) {
      router.push(`/signup?plan=${plan}`);
      return;
    }

    try {
      // In a real app, this would redirect to a payment processor
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user subscription
      updateUser({
        subscription: plan,
        resumeLimit: plan === 'standard' ? 30 : null,
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error upgrading subscription:', error);
    }
  };

  const isCurrentPlan = (plan: string) => {
    return user?.subscription === plan;
  };

  return (
    <>
      <Head>
        <title>Pricing - AI Resume Builder</title>
        <meta name="description" content="Choose the right plan for your resume building needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between py-4">
            <Link href="/" passHref>
              <Logo />
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {!user ? (
                <>
                  <Link href="/login" passHref>
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button>Sign up</Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" passHref>
                  <Button variant="outline">Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include access to our AI-powered resume builder.
            </p>
            
            <div className="mt-6">
              <Tabs 
                defaultValue="monthly" 
                value={billingCycle}
                onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
                className="inline-flex"
              >
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">
                    Yearly
                    <Badge variant="outline" className="ml-2 bg-primary/20 text-primary border-primary/20">
                      Save 20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className={`flex flex-col ${isCurrentPlan('free') ? 'border-primary' : ''}`}>
              <CardHeader>
                {isCurrentPlan('free') && (
                  <div className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-fit mb-2">
                    CURRENT PLAN
                  </div>
                )}
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
                {!user ? (
                  <Link href="/signup?plan=free" passHref className="w-full">
                    <Button variant="outline" className="w-full">
                      Start Free Trial
                    </Button>
                  </Link>
                ) : isCurrentPlan('free') ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Downgrade Not Available
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Standard Plan */}
            <Card className={`flex flex-col ${isCurrentPlan('standard') ? 'border-primary' : ''}`}>
              <CardHeader>
                {isCurrentPlan('standard') ? (
                  <div className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-fit mb-2">
                    CURRENT PLAN
                  </div>
                ) : (
                  <div className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-fit mb-2">
                    POPULAR
                  </div>
                )}
                <CardTitle>Standard</CardTitle>
                <CardDescription>For active job seekers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    £{billingCycle === 'monthly' ? '10' : '96'}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 mt-1">Save £24 per year</div>
                  )}
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
                {isCurrentPlan('standard') ? (
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : isCurrentPlan('premium') ? (
                  <Button variant="outline" className="w-full" disabled>
                    Downgrade Not Available
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => handleUpgrade('standard')}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner className="mr-2" size="sm" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {user ? 'Upgrade Now' : 'Subscribe Now'}
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className={`flex flex-col ${isCurrentPlan('premium') ? 'border-primary' : ''}`}>
              <CardHeader>
                {isCurrentPlan('premium') && (
                  <div className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-fit mb-2">
                    CURRENT PLAN
                  </div>
                )}
                <CardTitle>Premium</CardTitle>
                <CardDescription>For professionals</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    £{billingCycle === 'monthly' ? '25' : '240'}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 mt-1">Save £60 per year</div>
                  )}
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
                {isCurrentPlan('premium') ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    variant={isCurrentPlan('standard') ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => handleUpgrade('premium')}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner className="mr-2" size="sm" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {user ? (isCurrentPlan('standard') ? 'Upgrade Now' : 'Subscribe Now') : 'Subscribe Now'}
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I cancel my subscription at any time?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What happens when I reach my resume limit?</h3>
                <p className="text-muted-foreground">Standard plan users can create up to 30 resumes per month. If you need more, you can upgrade to the Premium plan for unlimited resumes.</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I switch between plans?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade your plan at any time. Downgrades will take effect at the end of your current billing period.</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">We offer a 14-day money-back guarantee if you're not satisfied with your subscription.</p>
              </div>
            </div>
          </div>
        </main>

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