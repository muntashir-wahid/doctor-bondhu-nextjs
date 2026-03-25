import { Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicFacility } from "./types";

interface ClinicFacilitiesCardProps {
  facilities: ClinicFacility[];
}

const ClinicFacilitiesCard = ({ facilities }: ClinicFacilitiesCardProps) => {
  return (
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
          <p className="text-sm text-muted-foreground text-center py-4">
            No facilities added yet
          </p>
        ) : (
          <div className="space-y-3">
            {facilities.map((facility) => (
              <div
                key={facility.uid}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/40"
              >
                <div className="rounded-md bg-secondary/10 p-1.5 shrink-0 mt-0.5">
                  <Building className="h-3.5 w-3.5 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {facility.name}
                  </p>
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
  );
};

export default ClinicFacilitiesCard;
