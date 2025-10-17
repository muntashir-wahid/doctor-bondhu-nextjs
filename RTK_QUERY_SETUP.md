# RTK Query + Axios Setup Documentation

This project uses **Redux Toolkit Query (RTK Query)** with **Axios** for efficient API state management. This setup provides automatic caching, background updates, and optimistic updates with a robust error handling system.

## 📁 Project Structure

```
lib/store/
├── index.ts                    # Main exports
├── store.ts                    # Redux store configuration
├── api.ts                      # Main API slice
├── axios.ts                    # Axios instance configuration
├── baseQuery.ts                # Custom Axios base query
├── hooks.ts                    # Custom hooks for common operations
├── ReduxProvider.tsx           # Redux provider component
└── api/
    ├── types.ts                # TypeScript types
    ├── authApi.ts              # Authentication endpoints
    ├── patientsApi.ts          # Patients endpoints
    ├── appointmentsApi.ts      # Appointments endpoints
    └── clinicsApi.ts           # Clinics endpoints
```

## 🚀 Getting Started

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_API_URL=https://api.doctorbondhu.com/api/v1
```

### 2. Basic Usage

Import and use the API hooks in your components:

```tsx
"use client";

import { useGetClinicsQuery, useCreatePatientMutation } from "@/lib/store";

export function MyComponent() {
  // Query data
  const { data, isLoading, error } = useGetClinicsQuery({
    page: 1,
    limit: 10,
  });

  // Mutation
  const [createPatient, { isLoading: isCreating }] = useCreatePatientMutation();

  const handleCreatePatient = async (patientData) => {
    try {
      const result = await createPatient(patientData).unwrap();
      console.log("Patient created:", result);
    } catch (error) {
      console.error("Failed to create patient:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      {data?.data?.map((clinic) => (
        <div key={clinic.id}>{clinic.name}</div>
      ))}
    </div>
  );
}
```

## 🔧 Configuration Details

### Axios Configuration (`axios.ts`)

- **Base URL**: Configurable via environment variables
- **Timeout**: 10 seconds default
- **Auto-retry**: Built-in retry logic
- **Request Interceptor**: Adds auth tokens automatically
- **Response Interceptor**: Handles common errors (401, 403, 500+)

### Store Configuration (`store.ts`)

- **RTK Query Integration**: Automatic caching and data fetching
- **DevTools**: Redux DevTools enabled in development
- **Middleware**: Custom middleware for API calls
- **Serializable Check**: Configured for optimal performance

### Base Query (`baseQuery.ts`)

Custom Axios-based query function that:

- Uses the configured Axios instance
- Handles errors consistently
- Provides TypeScript support
- Supports all HTTP methods

## 📚 Available APIs

### Authentication API (`authApi.ts`)

```tsx
import {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} from "@/lib/store";
```

### Patients API (`patientsApi.ts`)

```tsx
import {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  useSearchPatientsQuery,
} from "@/lib/store";
```

### Appointments API (`appointmentsApi.ts`)

```tsx
import {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useRescheduleAppointmentMutation,
  useCompleteAppointmentMutation,
} from "@/lib/store";
```

### Clinics API (`clinicsApi.ts`)

```tsx
import {
  useGetClinicsQuery,
  useGetClinicQuery,
  useGetFeaturedClinicsQuery,
  useSearchClinicsQuery,
  useGetClinicDoctorsQuery,
} from "@/lib/store";
```

## 🛠 Custom Hooks

### Error Handling

```tsx
import { useApiError } from "@/lib/store/hooks";

const { handleError } = useApiError();

// Use in components
useEffect(() => {
  if (error) handleError(error);
}, [error, handleError]);
```

### Loading States

```tsx
import { useApiState } from "@/lib/store/hooks";

const { getLoadingState } = useApiState();
const loadingState = getLoadingState(isLoading, isFetching);

// Returns: { isLoading, isInitialLoading, isRefetching }
```

### Pagination

```tsx
import { usePagination } from "@/lib/store/hooks";

const {
  page,
  limit,
  setPage,
  setLimit,
  resetPagination,
  nextPage,
  prevPage,
  goToPage,
} = usePagination(1, 10);
```

## 🏷 TypeScript Support

All APIs are fully typed with comprehensive TypeScript interfaces:

```tsx
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // ... more fields
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

interface PaginatedResponse<T> {
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
}
```

## 🔄 Cache Management

RTK Query automatically handles caching with tags:

```tsx
// Provides tags for caching
providesTags: [{ type: "Patient", id: "LIST" }];

// Invalidates cache when data changes
invalidatesTags: [{ type: "Patient", id: "LIST" }];
```

### Available Tags:

- `Patient` - Patient data
- `Appointment` - Appointment data
- `Doctor` - Doctor data
- `Clinic` - Clinic data
- `MedicalRecord` - Medical records
- `User` - User data
- `Analytics` - Analytics data

## 🚨 Error Handling

### Automatic Error Handling

- **401 Unauthorized**: Clears auth token, redirects to login
- **403 Forbidden**: Shows access denied message
- **500+ Server Errors**: Shows generic error message
- **Network Errors**: Handled gracefully with retry logic

### Manual Error Handling

```tsx
const [createPatient] = useCreatePatientMutation();

try {
  await createPatient(data).unwrap();
} catch (error) {
  if (error.status === 422) {
    // Handle validation errors
    console.log(error.data.errors);
  }
}
```

## ⚡ Performance Features

- **Automatic Caching**: Reduces unnecessary API calls
- **Background Refetching**: Keeps data fresh
- **Optimistic Updates**: Immediate UI updates
- **Request Deduplication**: Prevents duplicate requests
- **Polling**: Automatic data refresh at intervals
- **Prefetching**: Load data before it's needed

## 🧪 Testing

The setup is testing-friendly with:

- **Mocked API responses** for unit tests
- **Store providers** for component testing
- **Custom render helpers** with store context

## 📖 Advanced Usage

### Prefetching Data

```tsx
import { store } from "@/lib/store";

// Prefetch data
store.dispatch(api.util.prefetch("getClinics", { page: 1 }, { force: true }));
```

### Polling

```tsx
const { data } = useGetAppointmentsQuery(
  { status: "today" },
  { pollingInterval: 30000 } // Poll every 30 seconds
);
```

### Conditional Fetching

```tsx
const { data } = useGetPatientQuery(
  patientId,
  { skip: !patientId } // Skip if no patientId
);
```

This setup provides a robust, scalable, and maintainable API layer for your healthcare application! 🏥✨
