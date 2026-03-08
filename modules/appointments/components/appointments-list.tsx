"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  X,
  Check,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  MapPin,
  User,
  Stethoscope,
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

interface Appointment {
  id: string;
  patientName: string;
  patientImage?: string;
  doctorName: string;
  doctorImage?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "consultation" | "follow-up" | "checkup" | "emergency";
  mode: "in-person" | "video" | "phone";
  status: "scheduled" | "completed" | "cancelled" | "no-show" | "in-progress";
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    patientName: "John Anderson",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-10",
    time: "09:00 AM",
    duration: 30,
    type: "consultation",
    mode: "in-person",
    status: "scheduled",
    notes: "Initial consultation for chest pain",
  },
  {
    id: "apt2",
    patientName: "Emma Wilson",
    doctorName: "Dr. Michael Chen",
    date: "2024-03-10",
    time: "10:00 AM",
    duration: 45,
    type: "checkup",
    mode: "in-person",
    status: "in-progress",
    notes: "Routine pediatric checkup",
  },
  {
    id: "apt3",
    patientName: "Michael Brown",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-10",
    time: "11:00 AM",
    duration: 30,
    type: "follow-up",
    mode: "video",
    status: "scheduled",
    notes: "Follow-up on blood pressure medication",
  },
  {
    id: "apt4",
    patientName: "Sarah Davis",
    doctorName: "Dr. Emily Rodriguez",
    date: "2024-03-10",
    time: "02:00 PM",
    duration: 30,
    type: "consultation",
    mode: "in-person",
    status: "scheduled",
  },
  {
    id: "apt5",
    patientName: "David Martinez",
    doctorName: "Dr. James Wilson",
    date: "2024-03-09",
    time: "03:00 PM",
    duration: 60,
    type: "emergency",
    mode: "in-person",
    status: "completed",
    notes: "Sports injury - knee examination",
  },
  {
    id: "apt6",
    patientName: "Lisa Thompson",
    doctorName: "Dr. Priya Sharma",
    date: "2024-03-09",
    time: "09:30 AM",
    duration: 30,
    type: "follow-up",
    mode: "in-person",
    status: "completed",
  },
  {
    id: "apt7",
    patientName: "Robert Garcia",
    doctorName: "Dr. Robert Kim",
    date: "2024-03-09",
    time: "11:00 AM",
    duration: 45,
    type: "consultation",
    mode: "video",
    status: "no-show",
    notes: "Patient did not attend video call",
  },
  {
    id: "apt8",
    patientName: "Jennifer Lee",
    doctorName: "Dr. Michael Chen",
    date: "2024-03-08",
    time: "04:00 PM",
    duration: 30,
    type: "checkup",
    mode: "in-person",
    status: "cancelled",
    notes: "Cancelled by patient - rescheduling needed",
  },
  {
    id: "apt9",
    patientName: "James Miller",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-11",
    time: "10:00 AM",
    duration: 30,
    type: "follow-up",
    mode: "in-person",
    status: "scheduled",
  },
  {
    id: "apt10",
    patientName: "Maria Rodriguez",
    doctorName: "Dr. Emily Rodriguez",
    date: "2024-03-11",
    time: "02:30 PM",
    duration: 30,
    type: "consultation",
    mode: "video",
    status: "scheduled",
  },
];

const appointmentTypes = [
  "All Types",
  "consultation",
  "follow-up",
  "checkup",
  "emergency",
];

const appointmentModes = ["All Modes", "in-person", "video", "phone"];

const statusFilters = [
  "All Status",
  "scheduled",
  "in-progress",
  "completed",
  "cancelled",
  "no-show",
];

const AppointmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("all"); // today, tomorrow, week, all

  // Filter appointments
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.doctorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "All Types" || appointment.type === selectedType;
    const matchesMode =
      selectedMode === "All Modes" || appointment.mode === selectedMode;
    const matchesStatus =
      selectedStatus === "All Status" || appointment.status === selectedStatus;

    // Date filtering
    let matchesDate = true;
    if (dateFilter !== "all") {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter === "today") {
        matchesDate = appointmentDate.toDateString() === today.toDateString();
      } else if (dateFilter === "tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        matchesDate =
          appointmentDate.toDateString() === tomorrow.toDateString();
      } else if (dateFilter === "week") {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        matchesDate =
          appointmentDate >= today && appointmentDate <= weekFromNow;
      }
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesMode &&
      matchesStatus &&
      matchesDate
    );
  });

  // Calculate stats
  const totalAppointments = mockAppointments.length;
  const todayAppointments = mockAppointments.filter(
    (a) => a.date === "2024-03-10",
  ).length;
  const scheduledAppointments = mockAppointments.filter(
    (a) => a.status === "scheduled",
  ).length;
  const completedToday = mockAppointments.filter(
    (a) => a.status === "completed" && a.date === "2024-03-09",
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="default" className="gap-1 bg-blue-500">
            <Clock className="h-3 w-3" />
            Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="default" className="gap-1 bg-yellow-500">
            <AlertCircle className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="gap-1">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      case "no-show":
        return (
          <Badge variant="destructive" className="gap-1">
            <X className="h-3 w-3" />
            No Show
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      consultation: "bg-purple-100 text-purple-700 border-purple-200",
      "follow-up": "bg-blue-100 text-blue-700 border-blue-200",
      checkup: "bg-green-100 text-green-700 border-green-200",
      emergency: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <Badge variant="outline" className={colors[type] || ""}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case "video":
        return (
          <div className="flex items-center gap-1 text-sm">
            <Video className="h-3 w-3 text-muted-foreground" />
            <span>Video</span>
          </div>
        );
      case "in-person":
        return (
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>In-Person</span>
          </div>
        );
      case "phone":
        return (
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span>Phone</span>
          </div>
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
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage and view all clinic appointments
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments}</div>
            <p className="text-xs text-muted-foreground">Appointments today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledAppointments}</div>
            <p className="text-xs text-muted-foreground">Upcoming bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-muted-foreground">Finished yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={dateFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setDateFilter("all")}
        >
          All
        </Button>
        <Button
          variant={dateFilter === "today" ? "default" : "outline"}
          size="sm"
          onClick={() => setDateFilter("today")}
        >
          Today
        </Button>
        <Button
          variant={dateFilter === "tomorrow" ? "default" : "outline"}
          size="sm"
          onClick={() => setDateFilter("tomorrow")}
        >
          Tomorrow
        </Button>
        <Button
          variant={dateFilter === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setDateFilter("week")}
        >
          This Week
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by patient, doctor, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {appointmentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedMode} onValueChange={setSelectedMode}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            {appointmentModes.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
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
                  : status
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">{filteredAppointments.length}</span> of{" "}
          <span className="font-medium">{totalAppointments}</span> appointments
        </p>
        {(searchQuery ||
          selectedType !== "All Types" ||
          selectedMode !== "All Modes" ||
          selectedStatus !== "All Status" ||
          dateFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All Types");
              setSelectedMode("All Modes");
              setSelectedStatus("All Status");
              setDateFilter("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Appointments Table */}
      <Card>
        <CardContent className="p-0">
          {filteredAppointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={appointment.patientImage}
                            alt={appointment.patientName}
                          />
                          <AvatarFallback>
                            {getInitials(appointment.patientName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {appointment.patientName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {appointment.doctorName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {formatDate(appointment.date)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(appointment.type)}</TableCell>
                    <TableCell>{getModeBadge(appointment.mode)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {appointment.duration} min
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
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
                            Reschedule
                          </DropdownMenuItem>
                          {appointment.status === "scheduled" && (
                            <>
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-yellow-600">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Mark No Show
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Cancel Appointment
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
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No appointments found
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                We couldn't find any appointments matching your search criteria.
                Try adjusting your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All Types");
                  setSelectedMode("All Modes");
                  setSelectedStatus("All Status");
                  setDateFilter("all");
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

export default AppointmentsList;
