import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/layout/dashboard-sidebar";
import { TopBar } from "@/components/shared/layout/top-bar";
import { fetchMe } from "@/lib/actions/auth-actions";

const ClinicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const me = await fetchMe();

  return (
    <SidebarProvider>
      <DashboardSidebar organization="CLINIC" role={me?.role} me={me} />
      <SidebarInset>
        <TopBar role="CLINIC_ADMIN" me={me} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ClinicLayout;
