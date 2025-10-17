import { Header } from "@/components/shared/layout/header";
import { Footer } from "@/components/shared/layout/footer";
import { ClinicCard } from "@/components/shared/cards/clinic-card";
import { mockClinics } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClinicsPage() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold lg:text-5xl">
                Find Your Perfect Healthcare Provider
              </h1>
              <p className="mb-8 text-pretty text-lg text-muted-foreground">
                Browse through our network of registered clinics and healthcare
                facilities
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by clinic name, specialty, or location..."
                  className="h-12 pl-10 pr-4"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {mockClinics.length}
                </span>{" "}
                clinics
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
