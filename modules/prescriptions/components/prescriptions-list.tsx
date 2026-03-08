"use client";

import { useState } from "react";
import {
  Pill,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  RefreshCw,
  Eye,
  MoreVertical,
  Printer,
  Share2,
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
import { Progress } from "@/components/ui/progress";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

interface Prescription {
  id: string;
  prescriptionNumber: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage?: string;
  clinicName: string;
  issuedDate: string;
  expiryDate?: string;
  diagnosis: string;
  medications: Medication[];
  status: "active" | "expired" | "completed";
  refillsRemaining?: number;
  notes?: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: "px1",
    prescriptionNumber: "RX-2024-001234",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    clinicName: "Sunrise Medical Center",
    issuedDate: "2024-02-10",
    expiryDate: "2024-05-10",
    diagnosis: "Hypertension",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "90 days",
        instructions: "Take in the morning with food",
      },
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "90 days",
        instructions: "Take with food to avoid stomach upset",
      },
    ],
    status: "active",
    refillsRemaining: 2,
    notes:
      "Monitor blood pressure regularly. Return for follow-up in 3 months.",
  },
  {
    id: "px2",
    prescriptionNumber: "RX-2024-001567",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Dermatologist",
    clinicName: "Skin Care Specialists",
    issuedDate: "2024-03-01",
    expiryDate: "2024-04-01",
    diagnosis: "Eczema",
    medications: [
      {
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Apply thin layer to affected areas",
      },
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily at bedtime",
        duration: "30 days",
        instructions: "May cause drowsiness",
      },
    ],
    status: "active",
    refillsRemaining: 1,
  },
  {
    id: "px3",
    prescriptionNumber: "RX-2024-001890",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialty: "General Physician",
    clinicName: "Community Health Center",
    issuedDate: "2024-02-28",
    expiryDate: "2024-03-14",
    diagnosis: "Upper Respiratory Infection",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "10 days",
        instructions: "Complete the full course even if symptoms improve",
      },
    ],
    status: "completed",
    notes: "Course completed. Follow-up only if symptoms persist.",
  },
  {
    id: "px4",
    prescriptionNumber: "RX-2023-009876",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedic Surgeon",
    clinicName: "Sports Medicine Clinic",
    issuedDate: "2023-12-15",
    expiryDate: "2024-01-15",
    diagnosis: "Knee Inflammation",
    medications: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Three times daily with food",
        duration: "14 days",
        instructions: "Take with food. Stop if stomach pain occurs.",
      },
    ],
    status: "expired",
  },
  {
    id: "px5",
    prescriptionNumber: "RX-2024-002001",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Pediatrician",
    clinicName: "Green Valley Family Clinic",
    issuedDate: "2024-03-05",
    expiryDate: "2024-09-05",
    diagnosis: "Seasonal Allergies",
    medications: [
      {
        name: "Loratadine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed during allergy season",
        instructions: "Take in the morning. Can be taken with or without food.",
      },
    ],
    status: "active",
    refillsRemaining: 3,
  },
];

const statusFilters = ["All", "active", "completed", "expired"];

const PrescriptionsList = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter prescriptions
  const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
    if (selectedStatus === "All") return true;
    return prescription.status === selectedStatus;
  });

  // Calculate stats
  const totalPrescriptions = mockPrescriptions.length;
  const activePrescriptions = mockPrescriptions.filter(
    (p) => p.status === "active",
  ).length;
  const completedPrescriptions = mockPrescriptions.filter(
    (p) => p.status === "completed",
  ).length;
  const totalRefills = mockPrescriptions.reduce(
    (sum, p) => sum + (p.refillsRemaining || 0),
    0,
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle2 className="h-3 w-3" />
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Expired
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

  const calculateDaysRemaining = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const PrescriptionCard = ({
    prescription,
  }: {
    prescription: Prescription;
  }) => {
    const daysRemaining = calculateDaysRemaining(prescription.expiryDate);

    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-muted/20 border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={prescription.doctorImage}
                  alt={prescription.doctorName}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(prescription.doctorName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {prescription.doctorName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {prescription.doctorSpecialty} • {prescription.clinicName}
                    </p>
                  </div>
                  {getStatusBadge(prescription.status)}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{prescription.prescriptionNumber}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Issued: {formatDate(prescription.issuedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Diagnosis */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Diagnosis
            </p>
            <p className="font-medium">{prescription.diagnosis}</p>
          </div>

          <Separator />

          {/* Medications */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Medications ({prescription.medications.length})
            </p>
            <div className="space-y-3">
              {prescription.medications.map((med, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 rounded-lg bg-muted/30 border"
                >
                  <div className="rounded-full bg-primary/10 p-2 h-fit">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{med.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {med.dosage}
                      </Badge>
                    </div>
                    <div className="space-y-0.5 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Frequency:</span>{" "}
                        {med.frequency}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {med.duration}
                      </p>
                      {med.instructions && (
                        <p className="flex items-start gap-1 text-xs mt-1 p-2 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
                          <AlertCircle className="h-3 w-3 mt-0.5 shrink-0 text-blue-600" />
                          <span>{med.instructions}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry & Refills */}
          {prescription.status === "active" && (
            <>
              <Separator />
              <div className="space-y-3">
                {prescription.expiryDate && daysRemaining !== null && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Valid until</span>
                      <span className="font-medium">
                        {formatDate(prescription.expiryDate)}
                        {daysRemaining > 0 && (
                          <span className="ml-2 text-muted-foreground">
                            ({daysRemaining} days left)
                          </span>
                        )}
                      </span>
                    </div>
                    {daysRemaining > 0 && (
                      <Progress
                        value={Math.max(
                          0,
                          Math.min(
                            100,
                            100 -
                              (daysRemaining /
                                Math.ceil(
                                  (new Date(prescription.expiryDate).getTime() -
                                    new Date(
                                      prescription.issuedDate,
                                    ).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )) *
                                100,
                          ),
                        )}
                        className="h-2"
                      />
                    )}
                  </div>
                )}
                {prescription.refillsRemaining !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Refills remaining
                    </span>
                    <Badge variant="secondary" className="gap-1">
                      <RefreshCw className="h-3 w-3" />
                      {prescription.refillsRemaining}
                    </Badge>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Notes */}
          {prescription.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Additional Notes
                </p>
                <p className="text-sm">{prescription.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            {prescription.status === "active" &&
              prescription.refillsRemaining &&
              prescription.refillsRemaining > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Request Refill
                </Button>
              )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Prescription
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with Pharmacy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Prescriptions
          </h1>
          <p className="text-muted-foreground">
            View and manage your medical prescriptions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Prescriptions
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrescriptions}</div>
            <p className="text-xs text-muted-foreground">All prescriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePrescriptions}</div>
            <p className="text-xs text-muted-foreground">Currently valid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPrescriptions}</div>
            <p className="text-xs text-muted-foreground">Finished courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Refills Available
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRefills}</div>
            <p className="text-xs text-muted-foreground">Total refills</p>
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
                  ? "All Prescriptions"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">{filteredPrescriptions.length}</span> of{" "}
          <span className="font-medium">{totalPrescriptions}</span>{" "}
          prescriptions
        </p>
      </div>

      {/* Prescriptions List */}
      {filteredPrescriptions.length > 0 ? (
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Pill className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No prescriptions found
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              {selectedStatus === "All"
                ? "You don't have any prescriptions yet."
                : `You don't have any ${selectedStatus} prescriptions.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionsList;
