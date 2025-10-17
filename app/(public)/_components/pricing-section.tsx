import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small clinics and solo practitioners",
    price: 49,
    period: "month",
    popular: false,
    features: [
      "Up to 100 patients",
      "Basic appointment scheduling",
      "Patient records management",
      "Email notifications",
      "Mobile app access",
      "Basic reporting",
      "Email support",
    ],
    limitations: ["Limited to 1 provider", "Basic templates only"],
  },
  {
    name: "Professional",
    description: "Ideal for growing practices with multiple providers",
    price: 99,
    period: "month",
    popular: true,
    features: [
      "Up to 500 patients",
      "Advanced scheduling with conflict detection",
      "Complete patient records & history",
      "SMS & email notifications",
      "Mobile app for staff & patients",
      "Advanced analytics & reports",
      "Prescription management",
      "Insurance integration",
      "Priority support",
    ],
    limitations: ["Up to 5 providers"],
  },
  {
    name: "Enterprise",
    description: "For large clinics and healthcare organizations",
    price: 199,
    period: "month",
    popular: false,
    features: [
      "Unlimited patients",
      "AI-powered scheduling optimization",
      "Comprehensive EHR system",
      "Multi-channel communications",
      "White-label mobile apps",
      "Custom reports & dashboards",
      "Full prescription management",
      "Insurance & billing integration",
      "API access & integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "HIPAA compliance audit",
    ],
    limitations: [],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Choose the perfect plan for your clinic. All plans include a 14-day
            free trial with no setup fees.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/clinic-login">Start Free Trial</Link>
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      What's Included:
                    </h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mt-6">
                          Plan Limits:
                        </h4>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div
                            key={limitIndex}
                            className="flex items-start gap-3"
                          >
                            <div className="h-4 w-4 mt-0.5 shrink-0 rounded-full border border-muted-foreground/30" />
                            <span className="text-sm text-muted-foreground">
                              {limitation}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution?{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contact our sales team
            </Link>{" "}
            for enterprise pricing and features.
          </p>
        </div>
      </div>
    </section>
  );
}
