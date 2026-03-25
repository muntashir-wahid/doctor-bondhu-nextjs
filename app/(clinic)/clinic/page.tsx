import { getClinicDetails } from "@/lib/actions/clinics-actions";
import { type ClinicData } from "./_components/types";
import DashboardHeader from "./_components/dashboard-header";
import StatsRow from "./_components/stats-row";
import ServicesFacilities from "./_components/services-facilities";
import ScheduleCard from "./_components/schedule-card";

const ClinicDashboardPage = async () => {
  const { data, error } = await getClinicDetails();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">
          Failed to load clinic details: {error.message}
        </p>
      </div>
    );
  }

  const clinic: ClinicData = data?.data;

  return (
    <div className="py-4 space-y-6">
      <DashboardHeader clinic={clinic} />
      <StatsRow />
      <ScheduleCard workingHours={clinic.clinicWorkingHours} />
      <ServicesFacilities
        services={clinic.clinicServices}
        facilities={clinic.clinicFacilities}
      />
    </div>
  );
};

export default ClinicDashboardPage;
