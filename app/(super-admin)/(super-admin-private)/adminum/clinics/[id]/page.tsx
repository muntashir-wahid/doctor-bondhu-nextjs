import { getClinicDetails } from "@/lib/actions/clinics-actions";
import { type ClinicDetail } from "./_components/types";
import ClinicDetailHeader from "./_components/clinic-detail-header";
import ClinicInfoCard from "./_components/clinic-info-card";
import ClinicServicesCard from "./_components/clinic-services-card";
import ClinicFacilitiesCard from "./_components/clinic-facilities-card";
import ClinicWorkingHoursCard from "./_components/clinic-working-hours-card";

const AdminClinicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data, error } = await getClinicDetails(id);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">
          Failed to load clinic details: {error.message}
        </p>
      </div>
    );
  }

  const clinic: ClinicDetail = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
        <ClinicDetailHeader clinic={clinic} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <ClinicInfoCard clinic={clinic} />
            <ClinicWorkingHoursCard workingHours={clinic.clinicWorkingHours} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ClinicServicesCard services={clinic.clinicServices} />
            <ClinicFacilitiesCard facilities={clinic.clinicFacilities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicDetailsPage;
