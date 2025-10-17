import { api, apiTags } from "../api";
import {
  Patient,
  CreatePatientRequest,
  PatientFilters,
  ApiResponse,
  PaginatedResponse,
} from "./types";

// Patients API endpoints
export const patientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all patients with pagination and filters
    getPatients: builder.query<PaginatedResponse<Patient>, PatientFilters>({
      query: (params) => ({
        url: "/patients",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((patient: Patient) => ({
                type: "Patient" as const,
                id: patient.id,
              })),
              { type: "Patient" as const, id: "LIST" },
            ]
          : [{ type: "Patient" as const, id: "LIST" }],
    }),

    // Get patient by ID
    getPatient: builder.query<ApiResponse<Patient>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Patient" as const, id }],
    }),

    // Create new patient
    createPatient: builder.mutation<ApiResponse<Patient>, CreatePatientRequest>(
      {
        query: (patientData) => ({
          url: "/patients",
          method: "POST",
          data: patientData,
        }),
        invalidatesTags: [{ type: "Patient" as const, id: "LIST" }],
      }
    ),

    // Update patient
    updatePatient: builder.mutation<
      ApiResponse<Patient>,
      {
        id: string;
        data: Partial<CreatePatientRequest>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/patients/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Patient" as const, id },
        { type: "Patient" as const, id: "LIST" },
      ],
    }),

    // Delete patient
    deletePatient: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Patient" as const, id },
        { type: "Patient" as const, id: "LIST" },
      ],
    }),

    // Search patients
    searchPatients: builder.query<ApiResponse<Patient[]>, string>({
      query: (searchTerm) => ({
        url: "/patients/search",
        method: "GET",
        params: { q: searchTerm },
      }),
      providesTags: [{ type: "Patient" as const, id: "SEARCH" }],
    }),

    // Get patient medical history
    getPatientMedicalHistory: builder.query<ApiResponse<any[]>, string>({
      query: (patientId) => ({
        url: `/patients/${patientId}/medical-history`,
        method: "GET",
      }),
      providesTags: (result, error, patientId) => [
        { type: "MedicalRecord" as const, id: patientId },
      ],
    }),

    // Get patient appointments
    getPatientAppointments: builder.query<
      ApiResponse<any[]>,
      {
        patientId: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
      }
    >({
      query: ({ patientId, ...params }) => ({
        url: `/patients/${patientId}/appointments`,
        method: "GET",
        params,
      }),
      providesTags: (result, error, { patientId }) => [
        { type: "Appointment" as const, id: patientId },
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  useSearchPatientsQuery,
  useGetPatientMedicalHistoryQuery,
  useGetPatientAppointmentsQuery,
} = patientsApi;
