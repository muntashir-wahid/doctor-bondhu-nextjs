import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicItem } from "./types";
import ClinicListItem from "./clinic-list-item";

interface ClinicListProps {
  clinics: ClinicItem[];
}

const ClinicList = ({ clinics }: ClinicListProps) => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>All Clinics</span>
          <Badge variant="secondary" className="px-3 py-1">
            {clinics.length} clinics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {clinics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <Building2 className="h-10 w-10 opacity-30" />
            <p className="text-sm">No clinics found</p>
          </div>
        ) : (
          <div className="divide-y">
            {clinics.map((clinic) => (
              <ClinicListItem key={clinic.uid} clinic={clinic} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClinicList;
