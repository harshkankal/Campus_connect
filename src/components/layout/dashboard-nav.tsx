'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  GraduationCap,
  LayoutDashboard,
  CalendarDays,
  Camera,
  BookUser,
  Megaphone,
  BarChart3,
  Settings,
  Users,
  LogOut,
  User,
  Search,
  UserCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { UserRole } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usersAPI } from '@/lib/api/client';
import type { User } from '@/lib/types';
import { useEffect, useState } from 'react';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'student';
  const userId = searchParams.get('userId');
  const [currentUser, setCurrentUser] = useState<{name: string, email?: string} | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const allUsers = await usersAPI.getAllUsers();
        if (userId) {
          const user = allUsers.find(u => u.id === userId);
          if (user) {
            setCurrentUser({ name: user.name, email: user.email });
          }
        } else {
          // Fallback for when no specific user is logged in
          const user = allUsers.find(u => u.role === role);
          if (user) {
            setCurrentUser({ name: user.name, email: user.email });
          }
        }
      } catch (error) {
        console.error("Failed to load user", error);
      }
    };
    loadUser();
  }, [userId, role]);

  const getLinks = () => {
    const query = `?role=${role}&userId=${userId || ''}`;
    const studentLinks = [
      { href: `/dashboard${query}`, label: 'Dashboard', icon: LayoutDashboard },
      { href: `/dashboard/timetable${query}`, label: 'My Timetable', icon: CalendarDays },
      { href: `/dashboard/events${query}`, label: 'Events', icon: Megaphone },
      { href: `/dashboard/mark-attendance${query}`, label: 'Mark Attendance', icon: UserCheck },
      { href: `/dashboard/attendance-history${query}`, label: 'Attendance History', icon: BookUser },
    ];

    const facultyLinks = [
      { href: `/dashboard${query}`, label: 'Dashboard', icon: LayoutDashboard },
      { href: `/dashboard/timetable${query}`, label: 'My Timetable', icon: CalendarDays },
      { href: `/dashboard/attendance${query}`, label: 'Take Attendance', icon: Camera },
      { href: `/dashboard/events${query}`, label: 'Manage Events', icon: Megaphone },
      { href: `/dashboard/analytics${query}`, label: 'Analytics', icon: BarChart3 },
      { href: `/dashboard/attendance-check${query}`, label: 'Check Status', icon: Search },
      { href: `/dashboard/attendance-history${query}`, label: 'Attendance History', icon: BookUser },
    ];

    const adminLinks = [
      { href: `/dashboard${query}`, label: 'Dashboard', icon: LayoutDashboard },
      { href: `/dashboard/scheduler${query}`, label: 'Timetable Scheduler', icon: CalendarDays },
      { href: `/dashboard/analytics${query}`, label: 'Analytics', icon: BarChart3 },
      { href: `/dashboard/events${query}`, label: 'Manage Events', icon: Megaphone },
      { href: `/dashboard/users${query}`, label: 'User Management', icon: Users },
      { href: `/dashboard/system-settings${query}`, label: 'Settings', icon: Settings },
    ];

    switch (role) {
      case 'admin':
        return adminLinks;
      case 'faculty':
        return facultyLinks;
      case 'student':
      default:
        return studentLinks;
    }
  };

  const links = getLinks();
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <>
      <SidebarHeader className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-primary">CampusConnect</span>
            <span className="text-xs text-muted-foreground">{roleName} Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} passHref>
                  <SidebarMenuButton isActive={pathname === link.href.split('?')[0]} tooltip={link.label}>
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-start gap-3 w-full h-auto p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://picsum.photos/seed/${userId || role}/100/100`} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium text-sidebar-foreground">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{roleName}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser?.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{currentUser?.email || roleName}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
