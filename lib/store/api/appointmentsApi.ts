import { api, apiTags } from "../api";
import {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  AppointmentFilters,
  ApiResponse,
  PaginatedResponse,
} from "./types";

// Appointments API endpoints
export const appointmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all appointments with pagination and filters
    getAppointments: builder.query<
      PaginatedResponse<Appointment>,
      AppointmentFilters
    >({
      query: (params) => ({
        url: "/appointments",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((appointment: Appointment) => ({
                type: "Appointment" as const,
                id: appointment.id,
              })),
              { type: "Appointment" as const, id: "LIST" },
            ]
          : [{ type: "Appointment" as const, id: "LIST" }],
    }),

    // Get appointment by ID
    getAppointment: builder.query<ApiResponse<Appointment>, string>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Appointment" as const, id },
      ],
    }),

    // Create new appointment
    createAppointment: builder.mutation<
      ApiResponse<Appointment>,
      CreateAppointmentRequest
    >({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        data: appointmentData,
      }),
      invalidatesTags: [
        { type: "Appointment" as const, id: "LIST" },
        { type: "Doctor" as const, id: "LIST" }, // Invalidate doctor availability
      ],
    }),

    // Update appointment
    updateAppointment: builder.mutation<
      ApiResponse<Appointment>,
      {
        id: string;
        data: UpdateAppointmentRequest;
      }
    >({
      query: ({ id, data }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment" as const, id },
        { type: "Appointment" as const, id: "LIST" },
      ],
    }),

    // Cancel appointment
    cancelAppointment: builder.mutation<
      ApiResponse<Appointment>,
      {
        id: string;
        reason?: string;
      }
    >({
      query: ({ id, reason }) => ({
        url: `/appointments/${id}/cancel`,
        method: "PUT",
        data: { reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment" as const, id },
        { type: "Appointment" as const, id: "LIST" },
      ],
    }),

    // Reschedule appointment
    rescheduleAppointment: builder.mutation<
      ApiResponse<Appointment>,
      {
        id: string;
        newDate: string;
        newTime: string;
        reason?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: `/appointments/${id}/reschedule`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment" as const, id },
        { type: "Appointment" as const, id: "LIST" },
      ],
    }),

    // Complete appointment
    completeAppointment: builder.mutation<
      ApiResponse<Appointment>,
      {
        id: string;
        diagnosis?: string;
        prescription?: any[];
        notes?: string;
        followUpDate?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: `/appointments/${id}/complete`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Appointment" as const, id },
        { type: "Appointment" as const, id: "LIST" },
        { type: "MedicalRecord" as const, id: "LIST" },
      ],
    }),

    // Get today's appointments
    getTodaysAppointments: builder.query<
      ApiResponse<Appointment[]>,
      {
        doctorId?: string;
        clinicId?: string;
      }
    >({
      query: (params) => ({
        url: "/appointments/today",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Appointment" as const, id: "TODAY" }],
    }),

    // Get upcoming appointments
    getUpcomingAppointments: builder.query<
      ApiResponse<Appointment[]>,
      {
        patientId?: string;
        doctorId?: string;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "/appointments/upcoming",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Appointment" as const, id: "UPCOMING" }],
    }),

    // Get available time slots
    getAvailableTimeSlots: builder.query<
      ApiResponse<string[]>,
      {
        doctorId: string;
        date: string;
        duration?: number;
      }
    >({
      query: (params) => ({
        url: "/appointments/available-slots",
        method: "GET",
        params,
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useRescheduleAppointmentMutation,
  useCompleteAppointmentMutation,
  useGetTodaysAppointmentsQuery,
  useGetUpcomingAppointmentsQuery,
  useGetAvailableTimeSlotsQuery,
} = appointmentsApi;
