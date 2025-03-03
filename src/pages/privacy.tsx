import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - AI Resume Builder</title>
        <meta name="description" content="Privacy Policy for AI Resume Builder" />
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
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>Last updated: March 3, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                At AI Resume Builder, we respect your privacy and are committed to protecting your personal data.
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul>
                <li>Personal identifiers such as name, email address, and payment information</li>
                <li>Resume content and professional information you provide</li>
                <li>Usage data about how you interact with our service</li>
                <li>Device and browser information</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process payments and manage your account</li>
                <li>Communicate with you about your account, updates, and new features</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Analyze usage patterns to enhance our service</li>
              </ul>
              
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                unless a longer retention period is required or permitted by law. We will retain and use your information as necessary 
                to comply with our legal obligations, resolve disputes, and enforce our agreements.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate or incomplete data</li>
                <li>Deletion of your personal data</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              
              <h2>7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              
              <h2>8. Third-Party Services</h2>
              <p>
                Our service may contain links to third-party websites or services that are not owned or controlled by AI Resume Builder. 
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party 
                websites or services.
              </p>
              
              <h2>9. Children's Privacy</h2>
              <p>
                Our service is not intended for use by children under the age of 16. We do not knowingly collect personally identifiable 
                information from children under 16. If we discover that a child under 16 has provided us with personal information, 
                we will delete it immediately.
              </p>
              
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@airesumebuilder.com" className="text-primary hover:underline">privacy@airesumebuilder.com</a>.
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