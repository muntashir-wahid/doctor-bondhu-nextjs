"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClinicsQuery, useGetFeaturedClinicsQuery } from "@/lib/store";
import { useApiError, useApiState } from "@/lib/store/hooks";
import { MapPin, Star, Clock } from "lucide-react";

export function ClinicsExample() {
  const { handleError } = useApiError();
  const { getLoadingState } = useApiState();

  // Example: Get featured clinics
  const {
    data: featuredClinics,
    isLoading: isFeaturedLoading,
    isFetching: isFeaturedFetching,
    error: featuredError,
  } = useGetFeaturedClinicsQuery({ limit: 6 });

  // Example: Get all clinics with pagination
  const {
    data: allClinics,
    isLoading: isAllClinicsLoading,
    isFetching: isAllClinicsFetching,
    error: allClinicsError,
  } = useGetClinicsQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  const featuredLoadingState = getLoadingState(
    isFeaturedLoading,
    isFeaturedFetching
  );
  const allClinicsLoadingState = getLoadingState(
    isAllClinicsLoading,
    isAllClinicsFetching
  );

  // Handle errors
  React.useEffect(() => {
    if (featuredError) {
      handleError(featuredError);
    }
  }, [featuredError, handleError]);

  React.useEffect(() => {
    if (allClinicsError) {
      handleError(allClinicsError);
    }
  }, [allClinicsError, handleError]);

  if (featuredLoadingState.isInitialLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[125px] w-full rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Clinics Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Featured Clinics</h2>
          <p className="text-muted-foreground">
            Discover top-rated healthcare providers in your area
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredClinics?.data?.map((clinic: any) => (
            <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{clinic.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 fill-current" />
                    {clinic.rating}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {clinic.address.city}, {clinic.address.state}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {clinic.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Open Today:{" "}
                      {clinic.operatingHours.find((h: any) => !h.isClosed)
                        ?.openTime || "Closed"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {clinic.services
                      .slice(0, 3)
                      .map((service: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    {clinic.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{clinic.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Clinics Section */}
      <section>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">All Clinics</h2>
            <p className="text-muted-foreground">
              Browse all available healthcare providers
            </p>
          </div>
          {allClinicsLoadingState.isRefetching && (
            <Badge variant="outline">Refreshing...</Badge>
          )}
        </div>

        {allClinicsLoadingState.isInitialLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-9 w-[100px]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {allClinics?.data?.map((clinic: any) => (
              <Card key={clinic.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{clinic.name}</h3>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Star className="h-3 w-3 fill-current" />
                          {clinic.rating} ({clinic.totalReviews})
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {clinic.address.street}, {clinic.address.city}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {clinic.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {clinic.services
                          .slice(0, 5)
                          .map((service: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <Button>Book Appointment</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {allClinics?.pagination && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Showing {allClinics.data.length} of {allClinics.pagination.total}{" "}
            clinics
          </div>
        )}
      </section>
    </div>
  );
}
