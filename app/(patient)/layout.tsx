import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/layout/dashboard-sidebar";
import { TopBar } from "@/components/shared/layout/top-bar";
import { ClinicUserRole } from "@/lib/interfaces/me.interface";

const PatientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const me = {
    uid: "123456",
    email: "admin@doctorbondhu.com",
    firstName: "Dr.",
    lastName: "Admin",
    isSuperAdmin: false,
    clinicUid: "clinic123",
    clinicUserUid: "user123",
    role: "OWNER" as ClinicUserRole,
  };
  return (
    <SidebarProvider>
      <DashboardSidebar organization="USER" role="PATIENT" me={me} />
      <SidebarInset>
        <TopBar role="CLINIC_ADMIN" me={me} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PatientLayout;
