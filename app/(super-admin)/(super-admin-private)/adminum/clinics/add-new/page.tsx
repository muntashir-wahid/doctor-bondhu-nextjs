"use client";

import { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Building2, MapPin, Clock, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createClinic,
  type ICreateClinicPayload,
} from "@/lib/actions/clinics-actions";
import BasicInfoStep from "./_components/basic-info-step";
import ContactLocationStep from "./_components/contact-location-step";
import ServicesScheduleStep from "./_components/services-schedule-step";
import AdminUserStep from "./_components/admin-user-step";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "./_components/validation-schemas";
import { type FormValues } from "./_components/types";

const INITIAL_VALUES: FormValues = {
  name: "",
  type: "",
  clinicBanner: "",
  address: "",
  contact: "",
  email: "",
  website: "",
  services: [],
  facilities: [],
  workingHours: [
    {
      dayOfWeek: 0,
      dayName: "Sunday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: false,
    },
    {
      dayOfWeek: 1,
      dayName: "Monday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: true,
    },
    {
      dayOfWeek: 2,
      dayName: "Tuesday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: true,
    },
    {
      dayOfWeek: 3,
      dayName: "Wednesday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: true,
    },
    {
      dayOfWeek: 4,
      dayName: "Thursday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: true,
    },
    {
      dayOfWeek: 5,
      dayName: "Friday",
      openTime: "09:00",
      closeTime: "17:00",
      enabled: true,
    },
    {
      dayOfWeek: 6,
      dayName: "Saturday",
      openTime: "09:00",
      closeTime: "13:00",
      enabled: false,
    },
  ],
  owner: { firstName: "", lastName: "", email: "", password: "" },
};

const STEP_SCHEMAS = [step1Schema, step2Schema, step3Schema, step4Schema];
const TOTAL_STEPS = 4;

const STEP_META = [
  { title: "Basic Information", icon: Building2 },
  { title: "Contact & Location", icon: MapPin },
  { title: "Services & Schedule", icon: Clock },
  { title: "Admin User Setup", icon: User },
];

const AdminCreateClinicPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const stepIndex = currentStep - 1;
  const { title: stepTitle, icon: StepIcon } = STEP_META[stepIndex];

  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema: STEP_SCHEMAS[stepIndex],
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep((s) => s + 1);
        return;
      }

      const payload: ICreateClinicPayload = {
        name: values.name,
        type: values.type,
        clinicBanner: values.clinicBanner,
        address: values.address,
        contact: values.contact,
        email: values.email,
        website: values.website,
        services: values.services,
        facilities: values.facilities,
        workingHours: values.workingHours
          .filter((wh) => wh.enabled)
          .map(({ dayOfWeek, openTime, closeTime }) => ({
            dayOfWeek,
            openTime,
            closeTime,
          })),
        owner: values.owner,
      };

      console.log("Submitting Create Clinic with payload:", payload);

      const { data, error } = await createClinic(payload);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Clinic created successfully!");
      router.push("/adminum/clinics");
    },
  });

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/adminum/clinics" className="flex items-center gap-2">
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
                Set up a new clinic and assign an owner account
              </p>
            </div>
          </div>
        </div>

        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm text-muted-foreground">{stepTitle}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <StepIcon className="h-5 w-5 text-primary" />
                  {stepTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentStep === 1 && <BasicInfoStep />}
                {currentStep === 2 && <ContactLocationStep />}
                {currentStep === 3 && <ServicesScheduleStep />}
                {currentStep === 4 && <AdminUserStep />}

                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg"
                  >
                    {currentStep === TOTAL_STEPS
                      ? formik.isSubmitting
                        ? "Creating..."
                        : "Create Clinic"
                      : "Next Step"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default AdminCreateClinicPage;
