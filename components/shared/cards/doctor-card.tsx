import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, GraduationCap, Briefcase } from "lucide-react";
import type { Doctor } from "@/lib/mock-data";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md transition-all hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image section with gradient overlay */}
          <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />

            {/* Floating specialty badge */}
            <Badge className="absolute bottom-4 left-4 border-0 bg-white/95 px-3 py-1.5 text-primary shadow-lg backdrop-blur">
              {doctor.specialty}
            </Badge>
          </div>

          {/* Content section */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {doctor.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {doctor.bio}
              </p>
            </div>

            {/* Info grid with colored icons */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <GraduationCap className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Qualification
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.qualification}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Experience
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.experience}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <Clock className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Availability
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.availability}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
