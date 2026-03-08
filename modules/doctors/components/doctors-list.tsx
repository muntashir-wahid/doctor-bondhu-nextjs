"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Stethoscope,
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Doctor } from "@/lib/mock-data";

// Extended mock data for admin view with additional fields
interface DoctorAdmin extends Doctor {
  email: string;
  phone: string;
  status: "active" | "inactive" | "on-leave";
  patientsCount: number;
  appointmentsToday: number;
  joinedDate: string;
}

const mockDoctors: DoctorAdmin[] = [
  {
    id: "d1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    qualification: "MD, FACC",
    experience: "15 years",
    image: "/professional-female-doctor.png",
    availability: "Mon, Wed, Fri: 9:00 AM - 5:00 PM",
    bio: "Board-certified cardiologist specializing in preventive cardiology and heart disease management.",
    email: "sarah.johnson@clinic.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    patientsCount: 234,
    appointmentsToday: 8,
    joinedDate: "2020-03-15",
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    qualification: "MD, FAAP",
    experience: "12 years",
    image: "/professional-male-doctor.png",
    availability: "Tue, Thu, Sat: 10:00 AM - 6:00 PM",
    bio: "Dedicated pediatrician with expertise in child development and preventive care.",
    email: "michael.chen@clinic.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    patientsCount: 189,
    appointmentsToday: 12,
    joinedDate: "2021-06-20",
  },
  {
    id: "d3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    qualification: "MD, Board Certified",
    experience: "10 years",
    image: "/professional-female-doctor.png",
    availability: "Mon-Fri: 10:00 AM - 4:00 PM",
    bio: "Expert in medical and cosmetic dermatology with a focus on skin cancer prevention.",
    email: "emily.rodriguez@clinic.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    patientsCount: 156,
    appointmentsToday: 6,
    joinedDate: "2022-01-10",
  },
  {
    id: "d4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    qualification: "MD, FAAOS",
    experience: "18 years",
    image: "/professional-male-doctor.png",
    availability: "Tue, Thu: 8:00 AM - 3:00 PM",
    bio: "Specialized in sports medicine and joint replacement surgeries.",
    email: "james.wilson@clinic.com",
    phone: "+1 (555) 456-7890",
    status: "on-leave",
    patientsCount: 202,
    appointmentsToday: 0,
    joinedDate: "2019-09-05",
  },
  {
    id: "d5",
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    qualification: "MBBS, MD",
    experience: "8 years",
    image: "/professional-female-doctor.png",
    availability: "Mon-Sat: 9:00 AM - 6:00 PM",
    bio: "Comprehensive primary care physician focusing on preventive medicine and chronic disease management.",
    email: "priya.sharma@clinic.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    patientsCount: 312,
    appointmentsToday: 15,
    joinedDate: "2021-11-12",
  },
  {
    id: "d6",
    name: "Dr. Robert Kim",
    specialty: "Neurologist",
    qualification: "MD, PhD",
    experience: "20 years",
    image: "/professional-male-doctor.png",
    availability: "Wed, Fri: 1:00 PM - 7:00 PM",
    bio: "Leading expert in neurological disorders and headache management.",
    email: "robert.kim@clinic.com",
    phone: "+1 (555) 678-9012",
    status: "inactive",
    patientsCount: 98,
    appointmentsToday: 0,
    joinedDate: "2018-05-22",
  },
];

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Pediatrician",
  "Dermatologist",
  "Orthopedic Surgeon",
  "General Physician",
  "Neurologist",
];

const statusFilters = ["All Status", "active", "inactive", "on-leave"];

const DoctorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Filter doctors based on search, specialty, and status
  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;
    const matchesStatus =
      selectedStatus === "All Status" || doctor.status === selectedStatus;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  // Calculate stats
  const totalDoctors = mockDoctors.length;
  const activeDoctors = mockDoctors.filter((d) => d.status === "active").length;
  const totalAppointmentsToday = mockDoctors.reduce(
    (sum, d) => sum + d.appointmentsToday,
    0,
  );
  const specialtiesCount = new Set(mockDoctors.map((d) => d.specialty)).size;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle2 className="h-3 w-3" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="gap-1">
            <XCircle className="h-3 w-3" />
            Inactive
          </Badge>
        );
      case "on-leave":
        return (
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            On Leave
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">
            Manage and view all doctors in your clinic
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Doctor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <p className="text-xs text-muted-foreground">
              Registered professionals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Doctors
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDoctors}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Specialties</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialtiesCount}</div>
            <p className="text-xs text-muted-foreground">Medical departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointmentsToday}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, specialty, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "All Status"
                  ? status
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredDoctors.length}</span>{" "}
          of <span className="font-medium">{totalDoctors}</span> doctors
        </p>
        {(searchQuery ||
          selectedSpecialty !== "All Specialties" ||
          selectedStatus !== "All Status") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedSpecialty("All Specialties");
              setSelectedStatus("All Status");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Doctors Table */}
      <Card>
        <CardContent className="p-0">
          {filteredDoctors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Today's Appointments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doctor.qualification}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">
                          {doctor.experience} exp
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{doctor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{doctor.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {doctor.patientsCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {doctor.appointmentsToday}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Doctor
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Stethoscope className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                We couldn't find any doctors matching your search criteria. Try
                adjusting your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("All Specialties");
                  setSelectedStatus("All Status");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorsList;
