"use client";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { type ClinicItem, STATUS_STYLES } from "./types";

interface ClinicListItemProps {
  clinic: ClinicItem;
}

const ClinicListItem = ({ clinic }: ClinicListItemProps) => {
  return (
    <div className="flex items-start gap-4 p-6 transition-colors hover:bg-muted/50">
      <Avatar className="h-14 w-14 rounded-xl shrink-0">
        <AvatarImage src={clinic.clinicBanner} alt={clinic.name} />
        <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-base font-semibold">
          {clinic.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-foreground leading-tight">
                {clinic.name}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs font-medium ${STATUS_STYLES[clinic.status]}`}
              >
                {clinic.status}
              </Badge>
            </div>
            <Badge
              className="w-fit bg-primary/10 text-primary hover:bg-primary/20 text-xs"
              variant="secondary"
            >
              {clinic.type}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/adminum/clinics/${clinic.uid}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/adminum/clinics/${clinic.uid}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Clinic
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Clinic
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{clinic.address}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Phone className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span className="truncate">{clinic.contact}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
            <span className="truncate">{clinic.email}</span>
          </div>
        </div>

        {clinic.website && (
          <a
            href={clinic.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-3 w-3" />
            {clinic.website}
          </a>
        )}
      </div>
    </div>
  );
};

export default ClinicListItem;
