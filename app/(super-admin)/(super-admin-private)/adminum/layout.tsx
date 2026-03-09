import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/layout/dashboard-sidebar";
import { TopBar } from "@/components/shared/layout/top-bar";

const AdminPrivateLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <DashboardSidebar organization="SYSTEM" role="SUPER_ADMIN" />
      <SidebarInset>
        <TopBar role="SUPER_ADMIN" />
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPrivateLayout;
