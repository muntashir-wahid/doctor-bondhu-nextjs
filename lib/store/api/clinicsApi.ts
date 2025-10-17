import { api, apiTags } from "../api";
import { Clinic, ClinicFilters, ApiResponse, PaginatedResponse } from "./types";

// Clinics API endpoints
export const clinicsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all clinics with pagination and filters
    getClinics: builder.query<PaginatedResponse<Clinic>, ClinicFilters>({
      query: (params) => ({
        url: "/clinics",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((clinic: Clinic) => ({
                type: "Clinic" as const,
                id: clinic.id,
              })),
              { type: "Clinic" as const, id: "LIST" },
            ]
          : [{ type: "Clinic" as const, id: "LIST" }],
    }),

    // Get clinic by ID
    getClinic: builder.query<ApiResponse<Clinic>, string>({
      query: (id) => ({
        url: `/clinics/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Clinic" as const, id }],
    }),

    // Get featured clinics
    getFeaturedClinics: builder.query<
      ApiResponse<Clinic[]>,
      { limit?: number }
    >({
      query: (params) => ({
        url: "/clinics/featured",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Clinic" as const, id: "FEATURED" }],
    }),

    // Search clinics
    searchClinics: builder.query<
      ApiResponse<Clinic[]>,
      {
        query: string;
        location?: string;
        services?: string[];
        radius?: number;
      }
    >({
      query: (params) => ({
        url: "/clinics/search",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Clinic" as const, id: "SEARCH" }],
    }),

    // Get clinic doctors
    getClinicDoctors: builder.query<ApiResponse<any[]>, string>({
      query: (clinicId) => ({
        url: `/clinics/${clinicId}/doctors`,
        method: "GET",
      }),
      providesTags: (result, error, clinicId) => [
        { type: "Doctor" as const, id: clinicId },
      ],
    }),

    // Get clinic services
    getClinicServices: builder.query<ApiResponse<string[]>, string>({
      query: (clinicId) => ({
        url: `/clinics/${clinicId}/services`,
        method: "GET",
      }),
      providesTags: (result, error, clinicId) => [
        { type: "Clinic" as const, id: `${clinicId}-services` },
      ],
    }),

    // Get clinic reviews
    getClinicReviews: builder.query<
      ApiResponse<any[]>,
      {
        clinicId: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ clinicId, ...params }) => ({
        url: `/clinics/${clinicId}/reviews`,
        method: "GET",
        params,
      }),
      providesTags: (result, error, { clinicId }) => [
        { type: "Clinic" as const, id: `${clinicId}-reviews` },
      ],
    }),

    // Create clinic review
    createClinicReview: builder.mutation<
      ApiResponse<any>,
      {
        clinicId: string;
        rating: number;
        comment: string;
        appointmentId?: string;
      }
    >({
      query: ({ clinicId, ...data }) => ({
        url: `/clinics/${clinicId}/reviews`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { clinicId }) => [
        { type: "Clinic" as const, id: clinicId },
        { type: "Clinic" as const, id: `${clinicId}-reviews` },
        { type: "Clinic" as const, id: "LIST" },
      ],
    }),

    // Get nearby clinics
    getNearbyClinics: builder.query<
      ApiResponse<Clinic[]>,
      {
        latitude: number;
        longitude: number;
        radius?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "/clinics/nearby",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Clinic" as const, id: "NEARBY" }],
    }),
  }),
});

// Export hooks
export const {
  useGetClinicsQuery,
  useGetClinicQuery,
  useGetFeaturedClinicsQuery,
  useSearchClinicsQuery,
  useGetClinicDoctorsQuery,
  useGetClinicServicesQuery,
  useGetClinicReviewsQuery,
  useCreateClinicReviewMutation,
  useGetNearbyClinicsQuery,
} = clinicsApi;
