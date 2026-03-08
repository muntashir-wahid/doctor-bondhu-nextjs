"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ProfileDropdown } from "./profile-dropdown";
import { NotificationDropdown } from "./notification-dropdown";

interface TopBarProps {
  role?:
    | "SUPER_ADMIN"
    | "CLINIC_ADMIN"
    | "CLINIC_DOCTOR"
    | "CLINIC_RECEPTIONIST";
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function TopBar({ role, user }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
      <div className="flex items-center gap-2 px-4 w-full">
        {/* Left section: Sidebar trigger */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        {/* Middle section: Can be used for breadcrumbs or page title if needed */}
        <div className="flex-1" />

        {/* Right section: Notifications and Profile */}
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <Separator orientation="vertical" className="h-6" />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
