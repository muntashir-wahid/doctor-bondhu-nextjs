"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  Home,
  Stethoscope,
  Users,
  Building2,
  LogOut,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAVIGATION_ITEMS = {
  SUPER_ADMIN: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      title: "Clinics",
      icon: Building2,
      href: "/admin/clinics",
    },
  ],

  CLINIC_ADMIN: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Doctors",
      icon: Stethoscope,
      href: "/doctors",
    },
    {
      title: "Patients",
      icon: Users,
      href: "/patients",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/appointments",
    },
    {
      title: "Staffs",
      icon: Users,
      href: "/staffs",
    },
  ],

  CLINIC_DOCTOR: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Patients",
      icon: Users,
      href: "/patients",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/appointments",
    },
    {
      title: "Medical Records",
      icon: FileText,
      href: "/medical-records",
    },
  ],

  CLINIC_RECEPTIONIST: [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Patients",
      icon: Users,
      href: "/patients",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/appointments",
    },
  ],
};

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/patients",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/appointments",
  },
  {
    title: "Doctors",
    icon: Stethoscope,
    href: "/doctors",
  },
  {
    title: "Clinics",
    icon: Building2,
    href: "/clinics",
  },
  {
    title: "Medical Records",
    icon: FileText,
    href: "/medical-records",
  },
];

export function DashboardSidebar({
  role,
}: {
  role: keyof typeof NAVIGATION_ITEMS;
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" className="overflow-hidden">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">DoctorBondhu</span>
            <span className="truncate text-xs text-muted-foreground">
              Healthcare Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide overflow-y-auto">
        {/* Main Navigation */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>Main Navigation</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION_ITEMS[role].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="w-full overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 min-w-0"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2 min-w-0">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Dr. Admin</span>
                <span className="truncate text-xs text-muted-foreground">
                  admin@doctorbondhu.com
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
