import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Family Medicine Clinic",
    content:
      "DoctorBondhu has transformed how we manage our practice. Patient satisfaction is up 40% and our administrative time is down by half.",
    rating: 5,
    image: "/professional-female-doctor.png",
  },
  {
    name: "Dr. Michael Chen",
    role: "Pediatric Specialist",
    content:
      "The scheduling system is intuitive and the patient portal has been a game-changer for our families. Highly recommended!",
    rating: 5,
    image: "/professional-male-doctor.png",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Dental Practice",
    content:
      "We've seen a 60% reduction in no-shows thanks to the automated reminders. The analytics help us make better business decisions.",
    rating: 5,
    image: "/professional-female-dentist.png",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold lg:text-5xl">
            Trusted by Healthcare Professionals
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Join thousands of clinics delivering exceptional patient care with
            DoctorBondhu
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
