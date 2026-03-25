import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClinicPageHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Clinic Management
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all registered clinics in the system
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg"
          asChild
        >
          <Link href="/adminum/clinics/add-new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Clinic
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ClinicPageHeader;
