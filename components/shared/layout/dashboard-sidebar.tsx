"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Stethoscope, LogOut, User } from "lucide-react";
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
import DASHBOARD_ITEMS, { type DashboardItem } from "./dashboard-items";
import { IMe } from "@/lib/interfaces/me.interface";

type SystemRoles = "SUPER_ADMIN";
type ClinicRoles = "OWNER" | "ADMIN" | "DOCTOR" | "RECEPTIONIST";
type UserRoles = "PATIENT";

// type DashboardSidebarProps =
//   | { organization: "SYSTEM"; role: SystemRoles }
//   | { organization: "CLINIC"; role: ClinicRoles }
//   | { organization: "USER"; role: UserRoles };

interface IDashboardSidebarProps {
  organization: "SYSTEM" | "CLINIC" | "USER";
  role: SystemRoles | ClinicRoles | UserRoles;
  me: IMe;
}

export function DashboardSidebar({
  role,
  organization,
  me,
}: IDashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getDashboardItems = (): DashboardItem[] => {
    const orgItems = DASHBOARD_ITEMS[organization];
    if (orgItems && role in orgItems) {
      return (orgItems as any)[role] || [];
    }
    return [];
  };

  const items = getDashboardItems();

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
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
                <span className="truncate font-semibold">
                  {me.firstName} {me.lastName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {me.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 cursor-pointer"
                title="Log Out"
                onClick={() => router.push("/logout")}
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
