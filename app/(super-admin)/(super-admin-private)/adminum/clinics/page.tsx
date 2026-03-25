import { getAllClinics } from "@/lib/actions/clinics-actions";
import { type ClinicItem } from "./_components/types";
import ClinicPageHeader from "./_components/clinic-page-header";
import ClinicSearch from "./_components/clinic-search";
import ClinicList from "./_components/clinic-list";

const AdminClinicsPage = async () => {
  const { data, error } = await getAllClinics();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">
          Failed to load clinics: {error.message}
        </p>
      </div>
    );
  }

  const clinics: ClinicItem[] = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
        <ClinicPageHeader />
        <ClinicSearch />
        <ClinicList clinics={clinics} />
      </div>
    </div>
  );
};

export default AdminClinicsPage;
