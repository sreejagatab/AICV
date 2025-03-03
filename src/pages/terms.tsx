import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - AI Resume Builder</title>
        <meta name="description" content="Terms of Service for AI Resume Builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between py-4">
            <Link href="/" passHref>
              <Logo />
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 container py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>Last updated: March 3, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to AI Resume Builder. These Terms of Service govern your use of our website and services.
                By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, 
                you may not access the service.
              </p>
              
              <h2>2. Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and up-to-date information. 
                You are responsible for safeguarding the password and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2>3. Subscription and Payments</h2>
              <p>
                Some aspects of the Service are provided on a subscription basis. Payment will be charged to your chosen payment method 
                at the confirmation of purchase. Subscriptions automatically renew unless auto-renew is turned off at least 24 hours 
                before the end of the current period.
              </p>
              
              <h2>4. Content Ownership</h2>
              <p>
                You retain all rights to the information you provide to our service. We do not claim ownership over the resumes you create.
                However, you grant us a license to use, store, and process your content for the purpose of providing our service to you.
              </p>
              
              <h2>5. Acceptable Use</h2>
              <p>
                You may not use the service for any illegal or unauthorized purpose. You must not, in the use of the Service, 
                violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
              
              <h2>6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
                including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
              
              <h2>7. Limitation of Liability</h2>
              <p>
                In no event shall AI Resume Builder, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability 
                to access or use the Service.
              </p>
              
              <h2>8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@airesumebuilder.com" className="text-primary hover:underline">legal@airesumebuilder.com</a>.
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </main>

        <footer className="border-t py-6">
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