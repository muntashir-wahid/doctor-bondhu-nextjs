import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

// Define common tags for cache invalidation
export const apiTags = {
  Patient: "Patient",
  Appointment: "Appointment",
  Doctor: "Doctor",
  Clinic: "Clinic",
  MedicalRecord: "MedicalRecord",
  User: "User",
  Analytics: "Analytics",
} as const;

// Main API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  tagTypes: Object.values(apiTags),
  endpoints: () => ({}),
});

// Export hooks
export const {} = api;
