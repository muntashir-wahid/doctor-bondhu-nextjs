import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Globe,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getClinicDetails } from "@/lib/actions/clinics-actions";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function ClinicDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getClinicDetails(id);

  if (result.error || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive text-lg">
          Failed to load clinic details. Please try again later.
        </p>
      </div>
    );
  }

  const clinic = result.data?.data;

  const services: { uid: string; name: string; description?: string }[] =
    clinic.clinicServices ?? [];
  const facilities: { uid: string; name: string; description?: string }[] =
    clinic.clinicFacilities ?? [];
  const workingHours: {
    uid: string;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    status: string;
  }[] = clinic.clinicWorkingHours ?? [];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] w-full overflow-hidden">
          <img
            src="/placeholder.svg"
            alt={clinic.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 pb-8">
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {clinic.type || "General"}
              </Badge>
              <h1 className="mb-2 text-balance text-4xl font-bold lg:text-5xl">
                {clinic.name}
              </h1>
              <Badge
                className={
                  clinic.status === "ACTIVE"
                    ? "bg-emerald-500 text-white hover:bg-emerald-500"
                    : "bg-muted text-muted-foreground"
                }
              >
                {clinic.status || "ACTIVE"}
              </Badge>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Services */}
                {services.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-2xl font-semibold">
                        Services Offered
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((service) => (
                          <div
                            key={service.uid}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                              <p className="font-medium">{service.name}</p>
                              {service.description && (
                                <p className="text-sm text-muted-foreground">
                                  {service.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Facilities */}
                {facilities.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-2xl font-semibold">
                        Facilities
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {facilities.map((facility) => (
                          <Badge
                            key={facility.uid}
                            variant="secondary"
                            className="px-3 py-1"
                            title={facility.description}
                          >
                            {facility.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Working Hours */}
                {workingHours.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-2xl font-semibold">
                        Working Hours
                      </h2>
                      <div className="space-y-2">
                        {workingHours.map((wh) => (
                          <div
                            key={wh.uid}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="font-medium w-32">
                              {DAY_NAMES[wh.dayOfWeek] ?? `Day ${wh.dayOfWeek}`}
                            </span>
                            <span className="text-muted-foreground">
                              {wh.openTime} – {wh.closeTime}
                            </span>
                            <Badge
                              variant={
                                wh.status === "ACTIVE" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {wh.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Contact & CTA */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold">
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.address || "—"}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.contact || "—"}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.email || "—"}
                          </p>
                        </div>
                      </div>

                      {clinic.website && (
                        <>
                          <Separator />
                          <div className="flex items-start gap-3">
                            <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                              <p className="font-medium">Website</p>
                              <a
                                href={clinic.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline truncate block"
                              >
                                {clinic.website.replace(/^https?:\/\//, "")}
                              </a>
                            </div>
                          </div>
                        </>
                      )}

                      {workingHours.length > 0 && (
                        <>
                          <Separator />
                          <div className="flex items-start gap-3">
                            <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                              <p className="font-medium">Hours</p>
                              <p className="text-sm text-muted-foreground">
                                {DAY_NAMES[workingHours[0].dayOfWeek]}:{" "}
                                {workingHours[0].openTime} –{" "}
                                {workingHours[0].closeTime}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3">
                      <Button
                        className="w-full group/btn bg-gradient-to-r from-primary to-secondary"
                        size="lg"
                        asChild
                      >
                        <Link
                          href={`/clinics/${clinic.uid}/member-login`}
                          className="flex items-center justify-center gap-2"
                        >
                          Access Clinic Portal
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        size="lg"
                        asChild
                      >
                        <Link href="/clinics">Back to Clinics</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
