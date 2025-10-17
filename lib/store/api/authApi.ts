import { api, apiTags } from "../api";
import { LoginRequest, LoginResponse, User, ApiResponse } from "./types";

// Auth API endpoints
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),

    // Register endpoint
    register: builder.mutation<
      ApiResponse<{ user: User; token: string }>,
      {
        name: string;
        email: string;
        password: string;
        role?: string;
      }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        data: userData,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),

    // Refresh token
    refreshToken: builder.mutation<
      ApiResponse<{ token: string; refreshToken: string }>,
      {
        refreshToken: string;
      }
    >({
      query: ({ refreshToken }) => ({
        url: "/auth/refresh",
        method: "POST",
        data: { refreshToken },
      }),
    }),

    // Logout
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),

    // Forgot password
    forgotPassword: builder.mutation<ApiResponse<null>, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: { email },
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<
      ApiResponse<null>,
      {
        token: string;
        password: string;
        confirmPassword: string;
      }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),

    // Change password
    changePassword: builder.mutation<
      ApiResponse<null>,
      {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        data,
      }),
      invalidatesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
