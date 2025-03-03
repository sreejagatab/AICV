import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';
import ResumeHistory from './ResumeHistory';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  History, 
  User, 
  LogOut, 
  CreditCard, 
  Settings,
  ChevronDown
} from 'lucide-react';
import { ResumeFormData } from '@/types/resume';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onLoadResume?: (resumeData: ResumeFormData) => void;
}

const Header: React.FC<HeaderProps> = ({ onLoadResume }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="cursor-pointer flex items-center gap-2" onClick={() => router.push("/")}>
          <Logo />
          <span className="font-semibold text-xl hidden sm:inline-block">AI Resume Builder</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {onLoadResume && (
            <ResumeHistory onLoadResume={onLoadResume} />
          )}
          <ThemeToggle />
          
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/pricing')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Subscription</span>
                      {user.subscription !== 'free' ? (
                        <Badge variant="outline" className="ml-auto">
                          {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="ml-auto">Free Trial</Badge>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {user.role === 'admin' && (
                <Button size="sm" variant="default" onClick={() => router.push('/admin')}>
                  Admin
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => router.push("/login")}>
                Log in
              </Button>
              <Button size="sm" onClick={() => router.push("/signup")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;