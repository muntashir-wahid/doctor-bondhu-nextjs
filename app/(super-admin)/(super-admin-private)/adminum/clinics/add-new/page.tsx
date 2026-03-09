"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  Camera,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface FormData {
  // Clinic Information
  clinicName: string;
  specialty: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  workingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  services: string[];
  facilities: string[];

  // Admin User Information
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;
  adminPosition: string;
}

const specialties = [
  "Multi-Specialty",
  "Family Medicine",
  "Dental Care",
  "Ophthalmology",
  "Women's Health",
  "Sports Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Mental Health",
  "Other",
];

const commonServices = [
  "General Medicine",
  "Emergency Care",
  "Laboratory Services",
  "Radiology",
  "Pharmacy",
  "Preventive Care",
  "Chronic Disease Management",
  "Vaccinations",
  "Health Screenings",
  "Telemedicine",
];

const commonFacilities = [
  "24/7 Emergency",
  "Pharmacy",
  "Laboratory",
  "Radiology",
  "ICU",
  "On-site Lab",
  "Digital X-Ray",
  "Patient Portal",
  "Parking",
  "Wheelchair Access",
];

const AdminCreateClinicPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    clinicName: "",
    specialty: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    workingHours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "17:00", closed: false },
      friday: { open: "09:00", close: "17:00", closed: false },
      saturday: { open: "09:00", close: "13:00", closed: false },
      sunday: { open: "09:00", close: "13:00", closed: true },
    },
    services: [],
    facilities: [],
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
    adminPosition: "",
  });

  const [newService, setNewService] = useState("");
  const [newFacility, setNewFacility] = useState("");

  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          [field]: value,
        },
      },
    }));
  };

  const addService = (service: string) => {
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }));
    }
  };

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const addFacility = (facility: string) => {
    if (facility && !formData.facilities.includes(facility)) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facility],
      }));
    }
  };

  const removeFacility = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f !== facility),
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Here you would normally send data to backend
    alert("Clinic created successfully! (Demo mode)");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Contact & Location";
      case 3:
        return "Services & Schedule";
      case 4:
        return "Admin User Setup";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/clinics" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Clinics
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create New Clinic
              </h1>
              <p className="text-muted-foreground">
                Set up a new clinic and assign an admin user
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {getStepTitle(currentStep)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {currentStep === 1 && (
                <Building2 className="h-5 w-5 text-primary" />
              )}
              {currentStep === 2 && <MapPin className="h-5 w-5 text-primary" />}
              {currentStep === 3 && <Clock className="h-5 w-5 text-primary" />}
              {currentStep === 4 && <User className="h-5 w-5 text-primary" />}
              {getStepTitle(currentStep)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name *</Label>
                    <Input
                      id="clinicName"
                      placeholder="Enter clinic name"
                      value={formData.clinicName}
                      onChange={(e) =>
                        handleInputChange("clinicName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty *</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) =>
                        handleInputChange("specialty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the clinic's mission, services, and what makes it unique..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://www.example.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact & Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter full street address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@clinic.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Services & Schedule */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Services Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Services Offered</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Quick Add Services</Label>
                      <div className="flex flex-wrap gap-2">
                        {commonServices.map((service) => (
                          <Button
                            key={service}
                            variant={
                              formData.services.includes(service)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              formData.services.includes(service)
                                ? removeService(service)
                                : addService(service)
                            }
                          >
                            {service}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Add Custom Service</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter service name"
                          value={newService}
                          onChange={(e) => setNewService(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            addService(newService);
                            setNewService("");
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {formData.services.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Services</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.services.map((service) => (
                          <Badge
                            key={service}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {service}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 h-4 w-4 p-0"
                              onClick={() => removeService(service)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Facilities Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Facilities Available
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label>Quick Add Facilities</Label>
                      <div className="flex flex-wrap gap-2">
                        {commonFacilities.map((facility) => (
                          <Button
                            key={facility}
                            variant={
                              formData.facilities.includes(facility)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              formData.facilities.includes(facility)
                                ? removeFacility(facility)
                                : addFacility(facility)
                            }
                          >
                            {facility}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Add Custom Facility</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter facility name"
                          value={newFacility}
                          onChange={(e) => setNewFacility(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            addFacility(newFacility);
                            setNewFacility("");
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {formData.facilities.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Facilities</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.facilities.map((facility) => (
                          <Badge
                            key={facility}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {facility}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 h-4 w-4 p-0"
                              onClick={() => removeFacility(facility)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Working Hours Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Working Hours</h3>
                  <div className="space-y-3">
                    {Object.entries(formData.workingHours).map(
                      ([day, hours]) => (
                        <div
                          key={day}
                          className="flex items-center gap-4 p-4 border rounded-lg"
                        >
                          <div className="w-24 font-medium capitalize">
                            {day}
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) =>
                                handleWorkingHoursChange(
                                  day,
                                  "open",
                                  e.target.value
                                )
                              }
                              disabled={hours.closed}
                              className="w-32"
                            />
                            <span className="text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) =>
                                handleWorkingHoursChange(
                                  day,
                                  "close",
                                  e.target.value
                                )
                              }
                              disabled={hours.closed}
                              className="w-32"
                            />
                            <Button
                              variant={hours.closed ? "destructive" : "outline"}
                              size="sm"
                              onClick={() =>
                                handleWorkingHoursChange(
                                  day,
                                  "closed",
                                  !hours.closed
                                )
                              }
                            >
                              {hours.closed ? "Closed" : "Open"}
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Admin User Setup */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-3 w-fit mx-auto">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Clinic Administrator
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create an admin user who will manage this clinic
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adminFirstName">First Name *</Label>
                    <Input
                      id="adminFirstName"
                      placeholder="Enter first name"
                      value={formData.adminFirstName}
                      onChange={(e) =>
                        handleInputChange("adminFirstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminLastName">Last Name *</Label>
                    <Input
                      id="adminLastName"
                      placeholder="Enter last name"
                      value={formData.adminLastName}
                      onChange={(e) =>
                        handleInputChange("adminLastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email Address *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="admin@clinic.com"
                      value={formData.adminEmail}
                      onChange={(e) =>
                        handleInputChange("adminEmail", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Phone Number *</Label>
                    <Input
                      id="adminPhone"
                      placeholder="(555) 123-4567"
                      value={formData.adminPhone}
                      onChange={(e) =>
                        handleInputChange("adminPhone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPosition">Position/Title *</Label>
                  <Input
                    id="adminPosition"
                    placeholder="e.g., Practice Manager, Administrator, Director"
                    value={formData.adminPosition}
                    onChange={(e) =>
                      handleInputChange("adminPosition", e.target.value)
                    }
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> The admin user will receive login
                    credentials via email and will have full access to manage
                    this clinic's data, including doctors, patients, and
                    appointments.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg"
                >
                  Create Clinic
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg"
                >
                  Next Step
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCreateClinicPage;
