import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/layout/dashboard-sidebar";
import { TopBar } from "@/components/shared/layout/top-bar";
import { fetchMe } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

const AdminPrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const me = await fetchMe();

  if (!me || !me.isSuperAdmin) {
    redirect("/logout");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar organization="SYSTEM" role="SUPER_ADMIN" me={me} />
      <SidebarInset>
        <TopBar role="SUPER_ADMIN" me={me} />
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPrivateLayout;
