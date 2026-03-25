import { Stethoscope, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicService, type ClinicFacility } from "./types";

interface ServicesFacilitiesProps {
  services: ClinicService[];
  facilities: ClinicFacility[];
}

const ServicesFacilities = ({
  services,
  facilities,
}: ServicesFacilitiesProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Services</span>
            <Badge variant="secondary" className="font-normal">
              {services.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No services added yet
            </p>
          ) : (
            <div className="space-y-2">
              {services.map((service) => (
                <div
                  key={service.uid}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <div className="rounded-md bg-primary/10 p-1.5 shrink-0 mt-0.5">
                    <Stethoscope className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{service.name}</p>
                    {service.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Facilities</span>
            <Badge variant="secondary" className="font-normal">
              {facilities.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {facilities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No facilities added yet
            </p>
          ) : (
            <div className="space-y-2">
              {facilities.map((facility) => (
                <div
                  key={facility.uid}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <div className="rounded-md bg-secondary/10 p-1.5 shrink-0 mt-0.5">
                    <Building className="h-3.5 w-3.5 text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{facility.name}</p>
                    {facility.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {facility.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesFacilities;
