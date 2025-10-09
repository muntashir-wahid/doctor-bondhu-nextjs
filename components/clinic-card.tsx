import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Clinic } from "@/lib/mock-data"

interface ClinicCardProps {
  clinic: Clinic
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-md transition-all hover:shadow-xl">
      {/* Colored accent bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary via-secondary to-accent" />

      <div className="relative">
        {/* Image container with overlay gradient */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={clinic.image || "/placeholder.svg"}
            alt={clinic.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Floating specialty badge */}
          <Badge className="absolute right-4 top-4 border-0 bg-white/95 px-3 py-1.5 text-primary shadow-lg backdrop-blur">
            {clinic.specialty}
          </Badge>

          {/* Overlapping rating card */}
          <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-lg font-bold text-foreground">{clinic.rating}</span>
            <span className="text-sm text-muted-foreground">({clinic.reviewCount})</span>
          </div>
        </div>

        <CardContent className="space-y-4 p-6 pt-8">
          <div>
            <h3 className="mb-3 text-2xl font-bold leading-tight text-foreground">{clinic.name}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{clinic.description}</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-3 text-sm">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="flex-1 text-muted-foreground">{clinic.location}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="mt-0.5 rounded-lg bg-secondary/10 p-2">
                <Phone className="h-4 w-4 text-secondary" />
              </div>
              <span className="flex-1 text-muted-foreground">{clinic.phone}</span>
            </div>
          </div>

          {/* Action buttons with modern styling */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-primary/20 bg-transparent text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href={`/clinics/${clinic.id}`}>View Details</Link>
            </Button>
            <Button
              className="group/btn flex-1 bg-gradient-to-r from-primary to-secondary shadow-md transition-all hover:shadow-lg"
              asChild
            >
              <Link href={`/clinic-login?clinic=${clinic.id}`} className="flex items-center justify-center gap-2">
                Go to Clinic
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
