import { MapPin, Phone, Mail, Globe, Calendar, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type ClinicDetail } from "./types";

interface ClinicInfoCardProps {
  clinic: ClinicDetail;
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="rounded-md bg-muted p-2 shrink-0">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline truncate block"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-foreground">{value}</p>
      )}
    </div>
  </div>
);

const ClinicInfoCard = ({ clinic }: ClinicInfoCardProps) => {
  const createdAt = new Date(clinic.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedAt = new Date(clinic.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Contact & Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow icon={MapPin} label="Address" value={clinic.address} />
        <Separator />
        <InfoRow icon={Phone} label="Contact" value={clinic.contact} />
        <Separator />
        <InfoRow icon={Mail} label="Email" value={clinic.email} />
        {clinic.website && (
          <>
            <Separator />
            <InfoRow
              icon={Globe}
              label="Website"
              value={clinic.website}
              href={clinic.website}
            />
          </>
        )}
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <InfoRow icon={Calendar} label="Created" value={createdAt} />
          <InfoRow icon={RefreshCw} label="Updated" value={updatedAt} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicInfoCard;
