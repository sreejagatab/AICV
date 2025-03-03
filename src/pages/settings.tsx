import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, CreditCard, User, Lock } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

export default function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const { user, isLoading, updateUser } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Set initial form values
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (!name.trim()) {
        throw new Error('Name is required');
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateUser({ name });
      
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (!currentPassword) {
        throw new Error('Current password is required');
      }
      
      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }
      
      if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Settings - AI Resume Builder</title>
        <meta name="description" content="Manage your account settings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto p-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {success && (
                      <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
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
                          value={email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-sm text-muted-foreground">
                          Email cannot be changed
                        </p>
                      </div>
                      
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner className="mr-2" size="sm" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {success && (
                      <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner className="mr-2" size="sm" />
                            Updating...
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>
                      Manage your subscription plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Current Plan</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={user.subscription === 'premium' ? 'default' : user.subscription === 'standard' ? 'outline' : 'secondary'}>
                              {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                            </Badge>
                            {user.subscription === 'free' && (
                              <span className="text-sm text-muted-foreground">
                                (Expires: {new Date(user.subscriptionEndDate || '').toLocaleDateString()})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link href="/pricing" passHref>
                        <Button variant={user.subscription === 'free' ? 'default' : 'outline'}>
                          {user.subscription === 'free' ? 'Upgrade Plan' : 'Change Plan'}
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Plan Details</h3>
                      
                      <div className="grid gap-4">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Resume Limit</span>
                          <span className="font-medium">
                            {user.resumeLimit === null ? 'Unlimited' : `${user.resumeLimit} per month`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Resumes Created</span>
                          <span className="font-medium">{user.resumeCount}</span>
                        </div>
                        
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Watermark</span>
                          <span className="font-medium">
                            {user.subscription === 'free' ? 'Yes' : 'No'}
                          </span>
                        </div>
                        
                        {user.subscription !== 'free' && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Billing Cycle</span>
                            <span className="font-medium">Monthly</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {user.subscription !== 'free' && (
                      <div className="pt-4">
                        <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                          Cancel Subscription
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}