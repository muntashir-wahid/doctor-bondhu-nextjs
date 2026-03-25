import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-4 h-12 w-3/4 lg:h-14" />
            <Skeleton className="mx-auto mb-2 h-5 w-2/3" />
            <Skeleton className="mx-auto mb-8 h-5 w-1/2" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/40" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
