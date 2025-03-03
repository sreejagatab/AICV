import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Users, 
  FileText, 
  CreditCard, 
  DollarSign, 
  LogOut, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FileUp
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

// Mock data for demonstration
const mockUsers = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com', subscription: 'premium', resumeCount: 12, signupDate: '2025-02-15' },
  { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com', subscription: 'standard', resumeCount: 8, signupDate: '2025-02-20' },
  { id: 'user-3', name: 'Robert Johnson', email: 'robert@example.com', subscription: 'free', resumeCount: 1, signupDate: '2025-02-25' },
  { id: 'user-4', name: 'Emily Davis', email: 'emily@example.com', subscription: 'premium', resumeCount: 15, signupDate: '2025-02-10' },
  { id: 'user-5', name: 'Michael Wilson', email: 'michael@example.com', subscription: 'standard', resumeCount: 5, signupDate: '2025-02-18' },
  { id: 'user-6', name: 'Sarah Brown', email: 'sarah@example.com', subscription: 'free', resumeCount: 1, signupDate: '2025-02-28' },
  { id: 'user-7', name: 'David Miller', email: 'david@example.com', subscription: 'premium', resumeCount: 20, signupDate: '2025-02-05' },
  { id: 'user-8', name: 'Lisa Taylor', email: 'lisa@example.com', subscription: 'standard', resumeCount: 10, signupDate: '2025-02-12' },
];

const mockPayments = [
  { id: 'pay-1', userId: 'user-1', amount: 25, date: '2025-02-15', status: 'completed', plan: 'premium' },
  { id: 'pay-2', userId: 'user-2', amount: 10, date: '2025-02-20', status: 'completed', plan: 'standard' },
  { id: 'pay-3', userId: 'user-4', amount: 25, date: '2025-02-10', status: 'completed', plan: 'premium' },
  { id: 'pay-4', userId: 'user-5', amount: 10, date: '2025-02-18', status: 'completed', plan: 'standard' },
  { id: 'pay-5', userId: 'user-7', amount: 25, date: '2025-02-05', status: 'completed', plan: 'premium' },
  { id: 'pay-6', userId: 'user-8', amount: 10, date: '2025-02-12', status: 'completed', plan: 'standard' },
  { id: 'pay-7', userId: 'user-1', amount: 25, date: '2025-03-01', status: 'pending', plan: 'premium' },
  { id: 'pay-8', userId: 'user-2', amount: 10, date: '2025-03-01', status: 'pending', plan: 'standard' },
];

// Chart data
const usersByPlanData = [
  { name: 'Free', value: 2 },
  { name: 'Standard', value: 3 },
  { name: 'Premium', value: 3 },
];

const revenueData = [
  { name: 'Jan', revenue: 0 },
  { name: 'Feb', revenue: 105 },
  { name: 'Mar', revenue: 35 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate metrics
  const totalUsers = mockUsers.length;
  const totalRevenue = mockPayments.reduce((sum, payment) => sum + (payment.status === 'completed' ? payment.amount : 0), 0);
  const totalResumes = mockUsers.reduce((sum, user) => sum + user.resumeCount, 0);
  const activeSubscriptions = mockUsers.filter(user => user.subscription !== 'free').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - AI Resume Builder</title>
        <meta name="description" content="Admin dashboard for AI Resume Builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col border-r bg-card">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'ghost'} 
                className="justify-start" 
                onClick={() => setActiveTab('overview')}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button 
                variant={activeTab === 'users' ? 'default' : 'ghost'} 
                className="justify-start" 
                onClick={() => setActiveTab('users')}
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button 
                variant={activeTab === 'payments' ? 'default' : 'ghost'} 
                className="justify-start" 
                onClick={() => setActiveTab('payments')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </Button>
              <Button 
                variant={activeTab === 'resumes' ? 'default' : 'ghost'} 
                className="justify-start" 
                onClick={() => setActiveTab('resumes')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Resumes
              </Button>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Mobile header */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8 md:hidden">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="resumes">Resumes</TabsTrigger>
              </TabsList>
            </Tabs>
          </header>

          {/* Content */}
          <main className="grid gap-4 p-4 sm:px-6 sm:py-6 md:gap-8 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'payments' && 'Payment History'}
                {activeTab === 'resumes' && 'Resume Analytics'}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +2 from last week
                      </span>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£{totalRevenue}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +£35 from last month
                      </span>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeSubscriptions}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +1 from last week
                      </span>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalResumes}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 flex items-center">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +5 from yesterday
                      </span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue from subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`£${value}`, 'Revenue']} />
                          <Bar dataKey="revenue" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Users by Plan</CardTitle>
                    <CardDescription>Distribution of users across subscription plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={usersByPlanData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {usersByPlanData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Users']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Signups</CardTitle>
                    <CardDescription>New users who joined in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Signup Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.slice(0, 5).map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.subscription === 'premium' ? 'default' : user.subscription === 'standard' ? 'outline' : 'secondary'}>
                                {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(user.signupDate).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search users..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button size="sm">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Resumes</TableHead>
                          <TableHead>Signup Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.subscription === 'premium' ? 'default' : user.subscription === 'standard' ? 'outline' : 'secondary'}>
                                {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.resumeCount}</TableCell>
                            <TableCell>{new Date(user.signupDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Payment History</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <FileUp className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPayments.map((payment) => {
                          const user = mockUsers.find(u => u.id === payment.userId);
                          return (
                            <TableRow key={payment.id}>
                              <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                              <TableCell>{user?.name || 'Unknown'}</TableCell>
                              <TableCell>£{payment.amount}</TableCell>
                              <TableCell>
                                <Badge variant={payment.plan === 'premium' ? 'default' : 'outline'}>
                                  {payment.plan.charAt(0).toUpperCase() + payment.plan.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Resumes Tab */}
            {activeTab === 'resumes' && (
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Analytics</CardTitle>
                    <CardDescription>Overview of resume generation and usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Total Resumes Generated</h3>
                        <div className="text-3xl font-bold">{totalResumes}</div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Average per User</h3>
                        <div className="text-3xl font-bold">{(totalResumes / totalUsers).toFixed(1)}</div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Most Popular Template</h3>
                        <div className="text-3xl font-bold">Professional</div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-sm font-medium mb-4">Top Resume Generators</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead>Resumes Generated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockUsers
                            .sort((a, b) => b.resumeCount - a.resumeCount)
                            .slice(0, 5)
                            .map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  <Badge variant={user.subscription === 'premium' ? 'default' : user.subscription === 'standard' ? 'outline' : 'secondary'}>
                                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>{user.resumeCount}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}