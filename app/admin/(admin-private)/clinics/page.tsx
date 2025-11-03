import {
  Search,
  Plus,
  MapPin,
  Phone,
  Star,
  Users,
  Building2,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
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
import { mockClinics } from "@/lib/mock-data";
import Link from "next/link";

const AdminClinicsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
        {/* Header Section */}
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
              <Link href="/admin/clinics/add-new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Clinic
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Stats Section */}
        <div className="mb-6 grid gap-6 md:grid-cols-4">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clinics by name, specialty, or location..."
                className="pl-9"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockClinics.length}</p>
                  <p className="text-sm text-muted-foreground">Total Clinics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockClinics.reduce(
                      (total, clinic) => total + clinic.doctors.length,
                      0
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Doctors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinics List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Clinics</span>
              <Badge variant="secondary" className="px-3 py-1">
                {mockClinics.length} clinics
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockClinics.map((clinic, index) => (
                <div
                  key={clinic.id}
                  className={`flex items-center gap-4 p-6 transition-colors hover:bg-muted/50 ${
                    index !== mockClinics.length - 1 ? "border-b" : ""
                  }`}
                >
                  {/* Clinic Avatar/Image */}
                  <Avatar className="h-16 w-16 rounded-xl">
                    <AvatarImage src={clinic.image} alt={clinic.name} />
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-lg font-semibold">
                      {clinic.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Clinic Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {clinic.name}
                        </h3>
                        <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                          {clinic.specialty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{clinic.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({clinic.reviewCount})
                          </span>
                        </div>
                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Clinic
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Clinic
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Clinic Details */}
                    <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{clinic.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-secondary" />
                        <span>{clinic.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span>{clinic.doctors.length} doctors</span>
                      </div>
                    </div>

                    {/* Services Preview */}
                    <div className="flex flex-wrap gap-1">
                      {clinic.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {clinic.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{clinic.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminClinicsPage;
