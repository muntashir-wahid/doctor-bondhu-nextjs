import { Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicService } from "./types";

interface ClinicServicesCardProps {
  services: ClinicService[];
}

const ClinicServicesCard = ({ services }: ClinicServicesCardProps) => {
  return (
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
          <p className="text-sm text-muted-foreground text-center py-4">
            No services added yet
          </p>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.uid}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/40"
              >
                <div className="rounded-md bg-primary/10 p-1.5 shrink-0 mt-0.5">
                  <Stethoscope className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {service.name}
                  </p>
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
  );
};

export default ClinicServicesCard;
