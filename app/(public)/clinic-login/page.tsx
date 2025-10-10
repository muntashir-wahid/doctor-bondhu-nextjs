import { Header } from "@/components/shared/layout/header";
import { Footer } from "@/components/shared/layout/footer";
import { LoginForm } from "@/app/(public)/clinic-login/_components/login-form";

export default function ClinicLoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-balance text-3xl font-bold lg:text-4xl">
              Clinic Portal Login
            </h1>
            <p className="text-pretty text-muted-foreground">
              Access your clinic management dashboard
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
