import { Calendar, Users, FileText, BarChart3, Shield, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent appointment management with automated reminders and conflict prevention.",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Comprehensive patient records, history tracking, and seamless communication tools.",
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Secure, paperless medical records accessible anytime, anywhere with full compliance.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Real-time insights into clinic performance, patient trends, and revenue metrics.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security ensuring patient data protection and regulatory compliance.",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Cloud-based platform accessible from any device, enabling remote work capabilities.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold lg:text-5xl">Everything You Need to Run Your Clinic</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Powerful features designed to streamline your workflow and enhance patient care
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
