import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Sign Up & Setup",
    description: "Create your clinic profile in minutes. Add your team, services, and customize your settings.",
  },
  {
    number: "02",
    title: "Configure Your System",
    description: "Set up appointment types, working hours, and integrate with your existing tools seamlessly.",
  },
  {
    number: "03",
    title: "Start Managing",
    description: "Begin accepting appointments, managing patients, and streamlining your clinic operations.",
  },
  {
    number: "04",
    title: "Grow & Scale",
    description: "Use insights and analytics to optimize your practice and deliver exceptional patient care.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold lg:text-5xl">Get Started in Four Simple Steps</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Launch your clinic management system quickly and start seeing results immediately
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-8 hidden h-0.5 w-8 bg-primary/20 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
