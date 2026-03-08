import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/layout/dashboard-sidebar";
import { TopBar } from "@/components/shared/layout/top-bar";

const PatientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <DashboardSidebar organization="USER" role="PATIENT" />
      <SidebarInset>
        <TopBar role="CLINIC_ADMIN" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PatientLayout;
