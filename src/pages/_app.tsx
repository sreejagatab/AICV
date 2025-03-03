import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className="min-h-screen">
          <Component {...pageProps} />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}