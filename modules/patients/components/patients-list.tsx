"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Activity,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
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

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone: string;
  bloodGroup: string;
  registrationDate: string;
  lastVisit: string;
  nextAppointment?: string;
  assignedDoctor: string;
  totalVisits: number;
  status: "active" | "inactive" | "critical";
  image?: string;
}

const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Anderson",
    age: 45,
    gender: "Male",
    email: "john.anderson@email.com",
    phone: "+1 (555) 111-2222",
    bloodGroup: "O+",
    registrationDate: "2023-01-15",
    lastVisit: "2024-03-05",
    nextAppointment: "2024-03-15",
    assignedDoctor: "Dr. Sarah Johnson",
    totalVisits: 12,
    status: "active",
  },
  {
    id: "p2",
    name: "Emma Wilson",
    age: 32,
    gender: "Female",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 222-3333",
    bloodGroup: "A+",
    registrationDate: "2023-03-20",
    lastVisit: "2024-03-07",
    nextAppointment: "2024-03-20",
    assignedDoctor: "Dr. Michael Chen",
    totalVisits: 8,
    status: "active",
  },
  {
    id: "p3",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    email: "michael.brown@email.com",
    phone: "+1 (555) 333-4444",
    bloodGroup: "B+",
    registrationDate: "2022-11-10",
    lastVisit: "2024-03-08",
    assignedDoctor: "Dr. Sarah Johnson",
    totalVisits: 24,
    status: "critical",
  },
  {
    id: "p4",
    name: "Sarah Davis",
    age: 28,
    gender: "Female",
    email: "sarah.davis@email.com",
    phone: "+1 (555) 444-5555",
    bloodGroup: "AB+",
    registrationDate: "2023-06-05",
    lastVisit: "2024-02-28",
    nextAppointment: "2024-03-18",
    assignedDoctor: "Dr. Emily Rodriguez",
    totalVisits: 6,
    status: "active",
  },
  {
    id: "p5",
    name: "David Martinez",
    age: 41,
    gender: "Male",
    email: "david.martinez@email.com",
    phone: "+1 (555) 555-6666",
    bloodGroup: "O-",
    registrationDate: "2023-02-18",
    lastVisit: "2024-01-20",
    assignedDoctor: "Dr. James Wilson",
    totalVisits: 15,
    status: "inactive",
  },
  {
    id: "p6",
    name: "Lisa Thompson",
    age: 35,
    gender: "Female",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 666-7777",
    bloodGroup: "A-",
    registrationDate: "2023-08-12",
    lastVisit: "2024-03-06",
    nextAppointment: "2024-03-14",
    assignedDoctor: "Dr. Priya Sharma",
    totalVisits: 9,
    status: "active",
  },
  {
    id: "p7",
    name: "Robert Garcia",
    age: 62,
    gender: "Male",
    email: "robert.garcia@email.com",
    phone: "+1 (555) 777-8888",
    bloodGroup: "B-",
    registrationDate: "2022-05-22",
    lastVisit: "2024-03-07",
    nextAppointment: "2024-03-10",
    assignedDoctor: "Dr. Robert Kim",
    totalVisits: 28,
    status: "active",
  },
  {
    id: "p8",
    name: "Jennifer Lee",
    age: 29,
    gender: "Female",
    email: "jennifer.lee@email.com",
    phone: "+1 (555) 888-9999",
    bloodGroup: "O+",
    registrationDate: "2023-09-30",
    lastVisit: "2024-03-08",
    assignedDoctor: "Dr. Michael Chen",
    totalVisits: 5,
    status: "active",
  },
];

const bloodGroups = [
  "All Blood Groups",
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

const statusFilters = ["All Status", "active", "inactive", "critical"];
const genderFilters = ["All Genders", "Male", "Female", "Other"];

const PatientsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] =
    useState("All Blood Groups");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedGender, setSelectedGender] = useState("All Genders");

  // Filter patients based on search and filters
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.assignedDoctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodGroup =
      selectedBloodGroup === "All Blood Groups" ||
      patient.bloodGroup === selectedBloodGroup;
    const matchesStatus =
      selectedStatus === "All Status" || patient.status === selectedStatus;
    const matchesGender =
      selectedGender === "All Genders" || patient.gender === selectedGender;
    return matchesSearch && matchesBloodGroup && matchesStatus && matchesGender;
  });

  // Calculate stats
  const totalPatients = mockPatients.length;
  const activePatients = mockPatients.filter(
    (p) => p.status === "active",
  ).length;
  const criticalPatients = mockPatients.filter(
    (p) => p.status === "critical",
  ).length;
  const upcomingAppointments = mockPatients.filter(
    (p) => p.nextAppointment,
  ).length;

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
            <Clock className="h-3 w-3" />
            Inactive
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Critical
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage and view all patients in your clinic
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">Registered patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Patients
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePatients}</div>
            <p className="text-xs text-muted-foreground">Under treatment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Cases
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalPatients}</div>
            <p className="text-xs text-muted-foreground">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">Scheduled visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedBloodGroup}
          onValueChange={setSelectedBloodGroup}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent>
            {bloodGroups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedGender} onValueChange={setSelectedGender}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            {genderFilters.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[160px]">
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
          Showing <span className="font-medium">{filteredPatients.length}</span>{" "}
          of <span className="font-medium">{totalPatients}</span> patients
        </p>
        {(searchQuery ||
          selectedBloodGroup !== "All Blood Groups" ||
          selectedGender !== "All Genders" ||
          selectedStatus !== "All Status") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedBloodGroup("All Blood Groups");
              setSelectedGender("All Genders");
              setSelectedStatus("All Status");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          {filteredPatients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Assigned Doctor</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={patient.image} alt={patient.name} />
                          <AvatarFallback>
                            {getInitials(patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} yrs • {patient.gender}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{patient.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {patient.bloodGroup}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">
                        {patient.assignedDoctor}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{formatDate(patient.lastVisit)}</p>
                    </TableCell>
                    <TableCell>
                      {patient.nextAppointment ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(patient.nextAppointment)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No appointment
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {patient.totalVisits}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Medical Records
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Appointment
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
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No patients found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                We couldn't find any patients matching your search criteria. Try
                adjusting your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBloodGroup("All Blood Groups");
                  setSelectedGender("All Genders");
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

export default PatientsList;
