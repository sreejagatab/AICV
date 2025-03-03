import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, SubscriptionTier } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [plan, setPlan] = useState<SubscriptionTier>('free');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, user, isLoading } = useAuth();
  const router = useRouter();

  // Set initial plan from query parameter if available
  useEffect(() => {
    const planParam = router.query.plan as SubscriptionTier;
    if (planParam && ['free', 'standard', 'premium'].includes(planParam)) {
      setPlan(planParam);
    }
  }, [router.query]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (!name || !email || !password) {
        throw new Error('Please fill in all required fields');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // For paid plans, we would normally redirect to payment processing here
      if (plan !== 'free') {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Create account
      await signup(email, password, name, plan);
      
      // Redirect will happen automatically due to the useEffect above
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If already logged in, don't render the form (will redirect)
  if (user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Sign Up - AI Resume Builder</title>
        <meta name="description" content="Create your AI Resume Builder account" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between py-4">
            <Link href="/" passHref>
              <Logo />
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Select a Plan</Label>
                  <RadioGroup value={plan} onValueChange={(value) => setPlan(value as SubscriptionTier)} className="mt-2">
                    <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer">
                        <div className="font-medium">Free Trial</div>
                        <div className="text-sm text-muted-foreground">1 month access with watermark</div>
                      </Label>
                      <div className="font-semibold">£0</div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 mb-2 border-primary bg-primary/5">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard</div>
                        <div className="text-sm text-muted-foreground">30 resumes per month</div>
                      </Label>
                      <div className="font-semibold">£10/mo</div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="flex-1 cursor-pointer">
                        <div className="font-medium">Premium</div>
                        <div className="text-sm text-muted-foreground">Unlimited resumes</div>
                      </Label>
                      <div className="font-semibold">£25/mo</div>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner className="mr-2" size="sm" />
                      {plan !== 'free' ? 'Processing payment...' : 'Creating account...'}
                    </>
                  ) : (
                    plan !== 'free' ? 'Sign Up & Pay' : 'Sign Up'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-center text-muted-foreground w-full">
                <span>Already have an account? </span>
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </main>

        <footer className="border-t py-4">
          <div className="container flex justify-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}