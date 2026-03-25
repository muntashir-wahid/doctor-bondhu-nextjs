import { MapPin, Phone, Mail, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { type ClinicData, STATUS_STYLES } from "./types";

interface DashboardHeaderProps {
  clinic: ClinicData;
}

const DashboardHeader = ({ clinic }: DashboardHeaderProps) => {
  return (
    <div className="rounded-xl border-0 shadow-md bg-card overflow-hidden mb-6">
      <div
        className="h-32 w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative"
        style={
          clinic.clinicBanner
            ? {
                backgroundImage: `url(${clinic.clinicBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="px-6 pb-6 relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-8">
          <div className="flex items-end gap-4">
            <div className="h-16 w-16 rounded-2xl border-4 border-background bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-md">
              {clinic.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="pb-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-white leading-tight">
                  {clinic.name}
                </h1>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${STATUS_STYLES[clinic.status]}`}
                >
                  {clinic.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {clinic.type} Clinic
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="self-start sm:self-auto shrink-0"
          >
            <Link href="/clinic/settings">
              <Settings className="mr-2 h-4 w-4" />
              Clinic Settings
            </Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{clinic.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{clinic.contact}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span>{clinic.email}</span>
          </div>
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span>{clinic.website}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
