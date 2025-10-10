import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-balance text-3xl font-bold lg:text-5xl">
          Ready to Transform Your Clinic?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg opacity-90">
          Join thousands of healthcare providers who trust DoctorBondhu to
          manage their practice efficiently
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/clinic-login">Start Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <Link href="/clinics">Browse Clinics</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
