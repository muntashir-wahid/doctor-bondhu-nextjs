"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Download,
  MessageSquare,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface PatientAppointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage?: string;
  clinicName: string;
  date: string;
  time: string;
  duration: number;
  type: "consultation" | "follow-up" | "checkup" | "emergency";
  mode: "in-person" | "video" | "phone";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  address?: string;
  notes?: string;
  prescriptionAvailable?: boolean;
}

const mockAppointments: PatientAppointment[] = [
  {
    id: "pa1",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    clinicName: "Sunrise Medical Center",
    date: "2024-03-15",
    time: "10:00 AM",
    duration: 30,
    type: "follow-up",
    mode: "in-person",
    status: "scheduled",
    address: "123 Healthcare Ave, New York, NY 10001",
    notes: "Follow-up on blood pressure medication",
  },
  {
    id: "pa2",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Pediatrician",
    clinicName: "Green Valley Family Clinic",
    date: "2024-03-20",
    time: "02:30 PM",
    duration: 45,
    type: "checkup",
    mode: "video",
    status: "scheduled",
    notes: "Annual health checkup",
  },
  {
    id: "pa3",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Dermatologist",
    clinicName: "Skin Care Specialists",
    date: "2024-03-25",
    time: "11:00 AM",
    duration: 30,
    type: "consultation",
    mode: "in-person",
    status: "scheduled",
    address: "456 Wellness Blvd, Los Angeles, CA 90001",
  },
  {
    id: "pa4",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    clinicName: "Sunrise Medical Center",
    date: "2024-02-10",
    time: "09:00 AM",
    duration: 30,
    type: "consultation",
    mode: "in-person",
    status: "completed",
    address: "123 Healthcare Ave, New York, NY 10001",
    notes: "Initial consultation for chest pain",
    prescriptionAvailable: true,
  },
  {
    id: "pa5",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedic Surgeon",
    clinicName: "Sports Medicine Clinic",
    date: "2024-01-20",
    time: "03:00 PM",
    duration: 60,
    type: "consultation",
    mode: "in-person",
    status: "completed",
    address: "789 Health St, Chicago, IL 60601",
    prescriptionAvailable: true,
  },
  {
    id: "pa6",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialty: "General Physician",
    clinicName: "Community Health Center",
    date: "2024-02-28",
    time: "04:00 PM",
    duration: 30,
    type: "checkup",
    mode: "phone",
    status: "cancelled",
    notes: "Cancelled due to emergency",
  },
];

const statusFilters = ["All", "scheduled", "completed", "cancelled"];

const PatientAppointmentList = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter appointments
  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (selectedStatus === "All") return true;
    return appointment.status === selectedStatus;
  });

  // Separate upcoming and past appointments
  const upcomingAppointments = filteredAppointments.filter(
    (a) => a.status === "scheduled",
  );
  const pastAppointments = filteredAppointments.filter(
    (a) =>
      a.status === "completed" ||
      a.status === "cancelled" ||
      a.status === "no-show",
  );

  // Calculate stats
  const totalAppointments = mockAppointments.length;
  const scheduled = mockAppointments.filter(
    (a) => a.status === "scheduled",
  ).length;
  const completed = mockAppointments.filter(
    (a) => a.status === "completed",
  ).length;
  const cancelled = mockAppointments.filter(
    (a) => a.status === "cancelled" || a.status === "no-show",
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
            <X className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      case "no-show":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
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

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "in-person":
        return <MapPin className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
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
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const AppointmentCard = ({
    appointment,
  }: {
    appointment: PatientAppointment;
  }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Doctor Info Section */}
          <div className="flex items-start gap-4 p-6 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={appointment.doctorImage}
                alt={appointment.doctorName}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(appointment.doctorName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.doctorName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {appointment.doctorSpecialty}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {getTypeBadge(appointment.type)}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {getModeIcon(appointment.mode)}
                  <span>
                    {appointment.mode
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden sm:block" />

          {/* Appointment Details Section */}
          <div className="p-6 space-y-3 bg-muted/20 sm:w-80">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {formatDate(appointment.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {appointment.time} ({appointment.duration} min)
                  </span>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Clinic</p>
                <p className="font-medium">{appointment.clinicName}</p>
              </div>
              {appointment.address && (
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="text-sm">{appointment.address}</p>
                </div>
              )}
              {appointment.notes && (
                <div>
                  <p className="text-muted-foreground">Notes</p>
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-2">
              {appointment.status === "scheduled" && (
                <>
                  <Button size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Doctor
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <X className="mr-2 h-4 w-4" />
                        Cancel Appointment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              {appointment.status === "completed" && (
                <>
                  {appointment.prescriptionAvailable && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Prescription
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                </>
              )}
              {appointment.status === "cancelled" && (
                <Button size="sm" className="flex-1">
                  Rebook Appointment
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your medical appointments
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Book New Appointment
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
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled visits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
            <p className="text-xs text-muted-foreground">Past visits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelled}</div>
            <p className="text-xs text-muted-foreground">Cancelled visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "All"
                  ? "All Appointments"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">{filteredAppointments.length}</span> of{" "}
          <span className="font-medium">{totalAppointments}</span> appointments
        </p>
      </div>

      {/* Upcoming Appointments */}
      {(selectedStatus === "All" || selectedStatus === "scheduled") &&
        upcomingAppointments.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Badge variant="secondary">{upcomingAppointments.length}</Badge>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>
        )}

      {/* Past Appointments */}
      {(selectedStatus === "All" ||
        selectedStatus === "completed" ||
        selectedStatus === "cancelled") &&
        pastAppointments.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold">Past Appointments</h2>
              <Badge variant="secondary">{pastAppointments.length}</Badge>
            </div>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>
        )}

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No appointments found
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
              {selectedStatus === "All"
                ? "You don't have any appointments yet. Book your first appointment to get started."
                : `You don't have any ${selectedStatus} appointments.`}
            </p>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientAppointmentList;
