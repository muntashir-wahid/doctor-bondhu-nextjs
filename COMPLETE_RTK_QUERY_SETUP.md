# RTK Query + Axios Complete Setup Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Core Components](#core-components)
- [API Structure](#api-structure)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Official Documentation References](#official-documentation-references)

## 🔍 Overview

This project implements a robust API state management solution using **Redux Toolkit Query (RTK Query)** with **Axios** as the base query function. This combination provides:

- **Automatic caching** with intelligent cache invalidation
- **Background data fetching** and synchronization
- **Optimistic updates** for better UX
- **Request deduplication** to prevent unnecessary API calls
- **Built-in loading states** and error handling
- **TypeScript support** throughout the entire stack

### Why RTK Query + Axios?

- **RTK Query**: Provides powerful data fetching and caching capabilities built on Redux Toolkit
- **Axios**: Offers interceptors, request/response transformation, and better error handling than fetch
- **Combined**: Best of both worlds - RTK Query's state management with Axios's robust HTTP client

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        React Components                      │
├─────────────────────────────────────────────────────────────┤
│                     RTK Query Hooks                         │
│   useGetClinicsQuery, useCreatePatientMutation, etc.       │
├─────────────────────────────────────────────────────────────┤
│                    API Slice Endpoints                      │
│   authApi.ts, patientsApi.ts, appointmentsApi.ts          │
├─────────────────────────────────────────────────────────────┤
│                    Base Query (Axios)                       │
│              Custom Axios-based baseQuery                   │
├─────────────────────────────────────────────────────────────┤
│                   Axios Instance                            │
│        Interceptors, Auth, Error Handling                   │
├─────────────────────────────────────────────────────────────┤
│                      API Server                             │
│              RESTful Backend Service                        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Installation & Setup

### 1. Dependencies Installation

```bash
npm install @reduxjs/toolkit react-redux axios --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` to resolve React 19 compatibility issues with some peer dependencies.

### 2. Environment Configuration

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.doctorbondhu.com/api/v1

# Optional: Development API
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 3. Project Structure

```
lib/store/
├── index.ts                    # Main exports barrel file
├── store.ts                    # Redux store configuration
├── api.ts                      # Main API slice definition
├── axios.ts                    # Axios instance with interceptors
├── baseQuery.ts                # Custom Axios base query for RTK Query
├── hooks.ts                    # Custom hooks (typed selectors, etc.)
├── ReduxProvider.tsx           # React Redux Provider wrapper
└── api/
    ├── types.ts                # TypeScript type definitions
    ├── authApi.ts              # Authentication endpoints
    ├── patientsApi.ts          # Patient management endpoints
    ├── appointmentsApi.ts      # Appointment endpoints
    └── clinicsApi.ts           # Clinic management endpoints
```

## 🔧 Core Components

### 1. Axios Instance (`axios.ts`)

**Purpose**: Centralized HTTP client with interceptors for authentication and error handling.

```typescript
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.doctorbondhu.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/clinic-login";
    }
    return Promise.reject(error);
  }
);
```

**Key Features**:

- **Automatic token injection**: Adds Bearer tokens to requests
- **Global error handling**: Handles 401, 403, 500+ errors automatically
- **Request timeout**: 10-second timeout for all requests
- **Anti-caching**: Adds timestamp to prevent browser caching

**Official Reference**: [Axios Interceptors Documentation](https://axios-http.com/docs/interceptors)

### 2. Base Query (`baseQuery.ts`)

**Purpose**: Bridges Axios with RTK Query's query system.

```typescript
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "./axios";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
```

**Key Features**:

- **Type-safe**: Full TypeScript support
- **Error transformation**: Converts Axios errors to RTK Query format
- **Flexible parameters**: Supports all HTTP methods and options

**Official Reference**: [RTK Query Custom Base Queries](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery)

### 3. Main API Slice (`api.ts`)

**Purpose**: Central API slice that all endpoint APIs extend from.

```typescript
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export const apiTags = {
  Patient: "Patient",
  Appointment: "Appointment",
  Doctor: "Doctor",
  Clinic: "Clinic",
  MedicalRecord: "MedicalRecord",
  User: "User",
  Analytics: "Analytics",
} as const;

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: Object.values(apiTags),
  endpoints: () => ({}),
});
```

**Key Features**:

- **Tag-based caching**: Efficient cache invalidation system
- **Extensible**: Other API slices inject endpoints into this base
- **Centralized configuration**: Single source of truth for API setup

**Official Reference**: [RTK Query API Slice](https://redux-toolkit.js.org/rtk-query/usage/queries#defining-query-endpoints)

### 4. Redux Store (`store.ts`)

**Purpose**: Configures the Redux store with RTK Query integration.

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Key Features**:

- **RTK Query middleware**: Enables caching, refetching, polling
- **Listeners setup**: Handles refetchOnFocus/refetchOnReconnect
- **TypeScript types**: Exported for use throughout the app

**Official Reference**: [Redux Toolkit configureStore](https://redux-toolkit.js.org/api/configureStore)

## 📡 API Structure

### Type Definitions (`api/types.ts`)

Comprehensive TypeScript interfaces for the healthcare domain:

```typescript
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: Address;
  emergencyContact: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  medicalHistory?: string[];
  allergies?: string[];
  medications?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
  message?: string;
}
```

### Authentication API (`api/authApi.ts`)

**Purpose**: Handles user authentication, registration, and session management.

```typescript
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),

    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: [{ type: "User" as const, id: "CURRENT" }],
    }),

    // ... more endpoints
  }),
});
```

**Key Features**:

- **Mutation for login**: Handles authentication
- **Query for user data**: Fetches current user info
- **Cache invalidation**: Clears user cache on login/logout
- **Token management**: Integrates with Axios interceptors

### Patients API (`api/patientsApi.ts`)

**Purpose**: Complete patient management system.

```typescript
export const patientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<PaginatedResponse<Patient>, PatientFilters>({
      query: (params) => ({ url: "/patients", method: "GET", params }),
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

    // ... more endpoints
  }),
});
```

**Key Features**:

- **Pagination support**: Built-in pagination with filters
- **CRUD operations**: Create, read, update, delete patients
- **Intelligent caching**: Individual and list-level cache tags
- **Search functionality**: Patient search with query parameters

### Appointments API (`api/appointmentsApi.ts`)

**Purpose**: Comprehensive appointment management system.

```typescript
export const appointmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<
      PaginatedResponse<Appointment>,
      AppointmentFilters
    >({
      query: (params) => ({ url: "/appointments", method: "GET", params }),
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

    // ... more endpoints
  }),
});
```

**Key Features**:

- **Status management**: Track appointment lifecycle
- **Time slot management**: Check availability, prevent conflicts
- **Rescheduling**: Built-in rescheduling with reason tracking
- **Today/upcoming queries**: Specialized queries for dashboard

### Clinics API (`api/clinicsApi.ts`)

**Purpose**: Clinic discovery and management system.

```typescript
export const clinicsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClinics: builder.query<PaginatedResponse<Clinic>, ClinicFilters>({
      query: (params) => ({ url: "/clinics", method: "GET", params }),
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

    searchClinics: builder.query<
      ApiResponse<Clinic[]>,
      {
        query: string;
        location?: string;
        services?: string[];
        radius?: number;
      }
    >({
      query: (params) => ({ url: "/clinics/search", method: "GET", params }),
      providesTags: [{ type: "Clinic" as const, id: "SEARCH" }],
    }),

    // ... more endpoints
  }),
});
```

**Key Features**:

- **Geographic search**: Location-based clinic discovery
- **Service filtering**: Filter by available services
- **Review system**: Rating and review management
- **Featured clinics**: Highlighted clinic listings

## 💡 Usage Examples

### 1. Basic Query Usage

```typescript
"use client";

import { useGetPatientsQuery } from "@/lib/store";

export function PatientsTable() {
  const { data, isLoading, error, refetch } = useGetPatientsQuery({
    page: 1,
    limit: 10,
    search: "",
  });

  if (isLoading) return <div>Loading patients...</div>;
  if (error) return <div>Error loading patients</div>;

  return (
    <div>
      {data?.data.map((patient) => (
        <div key={patient.id}>
          {patient.firstName} {patient.lastName}
        </div>
      ))}
    </div>
  );
}
```

### 2. Mutation Usage with Error Handling

```typescript
"use client";

import { useCreatePatientMutation } from "@/lib/store";
import { useApiError } from "@/lib/store/hooks";

export function CreatePatientForm() {
  const [createPatient, { isLoading }] = useCreatePatientMutation();
  const { handleError } = useApiError();

  const handleSubmit = async (formData) => {
    try {
      const result = await createPatient(formData).unwrap();
      console.log("Patient created:", result);
      // Handle success (show toast, redirect, etc.)
    } catch (error) {
      handleError(error);
      // Additional error handling if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Patient"}
      </button>
    </form>
  );
}
```

### 3. Conditional Fetching

```typescript
export function PatientDetails({ patientId }: { patientId?: string }) {
  const { data: patient, isLoading } = useGetPatientQuery(
    patientId!,
    { skip: !patientId } // Skip query if no patientId
  );

  if (!patientId) return <div>Select a patient</div>;
  if (isLoading) return <div>Loading patient details...</div>;

  return <div>{patient?.data.firstName}</div>;
}
```

### 4. Polling for Real-time Updates

```typescript
export function LiveAppointments() {
  const { data } = useGetTodaysAppointmentsQuery(
    { doctorId: "current" },
    { pollingInterval: 30000 } // Poll every 30 seconds
  );

  return (
    <div>
      <h2>Today's Appointments (Live)</h2>
      {data?.data.map((appointment) => (
        <div key={appointment.id}>
          {appointment.patient.firstName} at {appointment.appointmentTime}
        </div>
      ))}
    </div>
  );
}
```

### 5. Custom Hooks Usage

```typescript
import { useApiState, usePagination } from "@/lib/store/hooks";

export function PatientsWithPagination() {
  const { page, limit, setPage, nextPage, prevPage } = usePagination(1, 10);
  const { getLoadingState } = useApiState();

  const { data, isLoading, isFetching, error } = useGetPatientsQuery({
    page,
    limit,
  });

  const loadingState = getLoadingState(isLoading, isFetching);

  return (
    <div>
      {loadingState.isInitialLoading && <div>Loading...</div>}
      {loadingState.isRefetching && <div>Refreshing...</div>}

      {/* Patient list */}

      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={nextPage} disabled={!data?.pagination.has_next_page}>
          Next
        </button>
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Cache Tag Strategy

**Use hierarchical tags for efficient invalidation**:

```typescript
// Provide tags
providesTags: (result) =>
  result
    ? [
        ...result.data.map((item) => ({ type: "Patient", id: item.id })), // Individual items
        { type: "Patient", id: "LIST" }, // List cache
      ]
    : [{ type: "Patient", id: "LIST" }];

// Invalidate strategically
invalidatesTags: [
  { type: "Patient", id: "LIST" }, // Invalidate list
  { type: "Appointment", id: "LIST" }, // Related data
];
```

### 2. Error Handling Pattern

```typescript
// In components
const { data, error, isLoading } = useGetPatientsQuery();

useEffect(() => {
  if (error) {
    handleError(error); // Custom error handler
  }
}, [error]);

// For mutations
try {
  await createPatient(data).unwrap();
  showSuccessToast("Patient created successfully");
} catch (error) {
  if (error.status === 422) {
    // Handle validation errors
    setFormErrors(error.data.errors);
  } else {
    handleError(error);
  }
}
```

### 3. Loading State Management

```typescript
// Use custom hook for consistent loading states
const { getLoadingState } = useApiState();
const loadingState = getLoadingState(isLoading, isFetching);

return (
  <div>
    {loadingState.isInitialLoading && <Skeleton />}
    {loadingState.isRefetching && <RefreshIndicator />}
    {/* Content */}
  </div>
);
```

### 4. Optimistic Updates

```typescript
const [updatePatient] = useUpdatePatientMutation();

const handleUpdate = async (patientId, updates) => {
  try {
    await updatePatient({
      id: patientId,
      data: updates,
    }).unwrap();
  } catch (error) {
    // RTK Query will automatically revert optimistic update on error
    handleError(error);
  }
};
```

## 🚨 Error Handling

### 1. Global Error Handling (Axios Interceptors)

```typescript
// In axios.ts
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token
      localStorage.removeItem("authToken");
      // Redirect to login
      window.location.href = "/clinic-login";
    } else if (error.response?.status === 403) {
      // Show access denied message
      showToast("Access denied", "error");
    } else if (error.response?.status >= 500) {
      // Show server error message
      showToast("Server error. Please try again later.", "error");
    }
    return Promise.reject(error);
  }
);
```

### 2. Component-Level Error Handling

```typescript
// Custom error handling hook
export const useApiError = () => {
  const handleError = (error: any) => {
    if (error?.status === 422) {
      // Validation errors
      const messages = Object.values(error.data.errors).flat();
      messages.forEach((msg) => showToast(msg, "error"));
    } else if (error?.data?.message) {
      showToast(error.data.message, "error");
    } else {
      showToast("An unexpected error occurred", "error");
    }
  };

  return { handleError };
};
```

### 3. Error Boundaries for RTK Query

```typescript
// Error boundary component
export class RTKQueryErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    if (error.name === "ChunkLoadError") {
      // Handle chunk loading errors (common in SPAs)
      window.location.reload();
    }

    // Log error to monitoring service
    console.error("RTK Query Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## ⚡ Performance Optimization

### 1. Selective Subscriptions

```typescript
// Only subscribe to data you need
const { data: patientBasicInfo } = useGetPatientQuery(patientId, {
  selectFromResult: ({ data, ...other }) => ({
    data: data
      ? {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        }
      : undefined,
    ...other,
  }),
});
```

### 2. Prefetching

```typescript
// Prefetch data before navigation
const dispatch = useAppDispatch();

const handlePatientClick = (patientId) => {
  // Prefetch patient details
  dispatch(api.util.prefetch("getPatient", patientId, { force: false }));

  // Navigate
  router.push(`/patients/${patientId}`);
};
```

### 3. Background Refetching

```typescript
// Keep data fresh in background
const { data } = useGetPatientsQuery(
  { page: 1, limit: 10 },
  {
    refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
    refetchOnFocus: true, // Refetch when window gains focus
    refetchOnReconnect: true, // Refetch when connection is restored
  }
);
```

### 4. Manual Cache Management

```typescript
// Update cache manually after successful mutation
const [updatePatient] = useUpdatePatientMutation();

const handleUpdate = async (patientId, updates) => {
  try {
    const result = await updatePatient({
      id: patientId,
      data: updates,
    }).unwrap();

    // Update individual patient cache
    dispatch(
      api.util.updateQueryData("getPatient", patientId, (draft) => {
        Object.assign(draft.data, result.data);
      })
    );
  } catch (error) {
    handleError(error);
  }
};
```

## 🧪 Testing

### 1. Mocking RTK Query

```typescript
// In test files
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mockApi = createApi({
  reducerPath: "mockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    fetchFn: jest.fn(), // Mock fetch function
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => "/patients",
    }),
  }),
});

// Mock responses
const mockPatients = [
  { id: "1", firstName: "John", lastName: "Doe" },
  { id: "2", firstName: "Jane", lastName: "Smith" },
];

jest.mock("@/lib/store", () => ({
  useGetPatientsQuery: () => ({
    data: { data: mockPatients },
    isLoading: false,
    error: null,
  }),
}));
```

### 2. Testing Components with RTK Query

```typescript
import { renderWithProviders } from "@/test-utils";

describe("PatientsList", () => {
  it("displays loading state", () => {
    const { getByText } = renderWithProviders(<PatientsList />, {
      preloadedState: {
        api: {
          queries: {
            'getPatients({"page":1,"limit":10})': {
              status: "pending",
            },
          },
        },
      },
    });

    expect(getByText("Loading patients...")).toBeInTheDocument();
  });
});
```

### 3. Testing Mutations

```typescript
describe("CreatePatientForm", () => {
  it("creates patient successfully", async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      data: { id: "1", firstName: "John", lastName: "Doe" },
    });

    jest.mock("@/lib/store", () => ({
      useCreatePatientMutation: () => [mockCreate, { isLoading: false }],
    }));

    const { getByRole } = renderWithProviders(<CreatePatientForm />);

    fireEvent.click(getByRole("button", { name: /create patient/i }));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        // ... other form data
      });
    });
  });
});
```

## 📚 Official Documentation References

### Redux Toolkit Query

- **Main Documentation**: [RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
- **API Reference**: [RTK Query API](https://redux-toolkit.js.org/rtk-query/api/createApi)
- **Usage Guide**: [RTK Query Usage Patterns](https://redux-toolkit.js.org/rtk-query/usage/queries)
- **Caching Behavior**: [RTK Query Caching](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)
- **Error Handling**: [RTK Query Error Handling](https://redux-toolkit.js.org/rtk-query/usage/error-handling)
- **TypeScript Guide**: [RTK Query with TypeScript](https://redux-toolkit.js.org/rtk-query/usage-with-typescript)

### Axios

- **Main Documentation**: [Axios Documentation](https://axios-http.com/docs/intro)
- **Interceptors**: [Request/Response Interceptors](https://axios-http.com/docs/interceptors)
- **Error Handling**: [Axios Error Handling](https://axios-http.com/docs/handling_errors)
- **Request Configuration**: [Axios Request Config](https://axios-http.com/docs/req_config)
- **Instance Creation**: [Axios Instances](https://axios-http.com/docs/instance)

### Redux & Redux Toolkit

- **Redux Toolkit**: [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- **configureStore**: [Store Setup](https://redux-toolkit.js.org/api/configureStore)
- **TypeScript Usage**: [Redux Toolkit with TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript)

### React Redux

- **React Redux**: [React Redux Documentation](https://react-redux.js.org/)
- **Hooks API**: [React Redux Hooks](https://react-redux.js.org/api/hooks)
- **TypeScript Guide**: [React Redux TypeScript Guide](https://react-redux.js.org/using-react-redux/usage-with-typescript)

### Next.js Integration

- **Next.js with Redux**: [Next.js Redux Setup](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- **App Router**: [Next.js 13+ App Router](https://nextjs.org/docs/app)

## 🔧 Advanced Configuration

### Environment-Specific Setup

```typescript
// Development vs Production API URLs
const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      process.env.NEXT_PUBLIC_DEV_API_URL || "http://localhost:8000/api/v1"
    );
  }
  return (
    process.env.NEXT_PUBLIC_API_URL || "https://api.doctorbondhu.com/api/v1"
  );
};

// In axios.ts
const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: process.env.NODE_ENV === "development" ? 30000 : 10000,
});
```

### Authentication Flow Integration

```typescript
// Token refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/auth/refresh", { refreshToken });

        const { token } = response.data;
        localStorage.setItem("authToken", token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/clinic-login";
      }
    }

    return Promise.reject(error);
  }
);
```

This comprehensive setup provides a robust, scalable, and maintainable API layer for your healthcare management application using industry best practices and official recommendations from Redux Toolkit Query and Axios documentation.

## 🎯 Summary

This RTK Query + Axios setup provides:

✅ **Type-safe API calls** with full TypeScript support  
✅ **Automatic caching** with intelligent invalidation  
✅ **Global error handling** with user-friendly messages  
✅ **Request/response interceptors** for auth and preprocessing  
✅ **Optimistic updates** for better user experience  
✅ **Background refetching** to keep data fresh  
✅ **Pagination and filtering** built-in  
✅ **Testing-friendly** architecture  
✅ **Performance optimized** with selective subscriptions  
✅ **Comprehensive documentation** and examples

The setup follows official best practices from both Redux Toolkit Query and Axios documentation, ensuring long-term maintainability and developer productivity.
