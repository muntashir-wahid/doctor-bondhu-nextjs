import { Header } from "@/components/shared/layout/header";
import { Footer } from "@/components/shared/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Clinic Not Found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The clinic you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/clinics">Browse All Clinics</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
