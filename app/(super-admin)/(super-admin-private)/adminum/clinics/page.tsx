import {
  Search,
  Plus,
  MapPin,
  Phone,
  Building2,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getAllClinics } from "@/lib/actions/clinics-actions";

interface ClinicItem {
  uid: string;
  name: string;
  slug: string;
  address: string;
  contact: string;
  email: string;
  type: string;
  clinicBanner: string;
  website: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

const STATUS_STYLES: Record<ClinicItem["status"], string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
};

const AdminClinicsPage = async () => {
  const { data, error } = await getAllClinics();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">
          Failed to load clinics: {error.message}
        </p>
      </div>
    );
  }

  const clinics: ClinicItem[] = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
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

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clinics by name, type, or location..."
              className="pl-9"
            />
          </div>
        </div>

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
              <div className="space-y-0">
                {clinics.map((clinic, index) => (
                  <div
                    key={clinic.uid}
                    className={`flex items-start gap-4 p-6 transition-colors hover:bg-muted/50 ${
                      index !== clinics.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <Avatar className="h-14 w-14 rounded-xl shrink-0">
                      <AvatarImage
                        src={clinic.clinicBanner}
                        alt={clinic.name}
                      />
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
                              <Link
                                href={`/adminum/clinics/${clinic.uid}/edit`}
                              >
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminClinicsPage;
