import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getClinicById } from "@/lib/mock-data";
import { DoctorCard } from "@/components/shared/cards/doctor-card";

export default async function ClinicDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinic = getClinicById(id);

  if (!clinic) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] w-full overflow-hidden">
          <img
            src={clinic.image || "/placeholder.svg"}
            alt={clinic.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 pb-8">
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {clinic.specialty}
              </Badge>
              <h1 className="mb-2 text-balance text-4xl font-bold lg:text-5xl">
                {clinic.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-lg font-semibold">{clinic.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({clinic.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-2xl font-semibold">
                      About This Clinic
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {clinic.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-2xl font-semibold">
                      Services Offered
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {clinic.services.map((service, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-2xl font-semibold">Facilities</h2>
                    <div className="flex flex-wrap gap-2">
                      {clinic.facilities.map((facility, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Doctors Section */}
                <div>
                  <h2 className="mb-6 text-2xl font-semibold">
                    Our Medical Team
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {clinic.doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                </div>
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
                            {clinic.address}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.phone}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.email}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium">Working Hours</p>
                          <p className="text-sm text-muted-foreground">
                            {clinic.workingHours}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`/clinics/${clinic.id}/login`}>
                          Access Clinic Portal
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
