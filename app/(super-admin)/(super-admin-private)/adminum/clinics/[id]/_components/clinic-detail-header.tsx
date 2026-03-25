import { ArrowLeft, Edit, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { type ClinicDetail, STATUS_STYLES } from "./types";

interface ClinicDetailHeaderProps {
  clinic: ClinicDetail;
}

const ClinicDetailHeader = ({ clinic }: ClinicDetailHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/adminum/clinics" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Clinics
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-2xl shrink-0">
            <AvatarImage src={clinic.clinicBanner} alt={clinic.name} />
            <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-xl font-bold">
              {clinic.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">
                {clinic.name}
              </h1>
              <Badge
                variant="outline"
                className={`text-xs font-medium ${STATUS_STYLES[clinic.status]}`}
              >
                {clinic.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {clinic.type} · {clinic.slug}
              </span>
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href={`/adminum/clinics/${clinic.uid}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Clinic
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ClinicDetailHeader;
