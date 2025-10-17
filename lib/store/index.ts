// Export main store and types
export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

// Export main API
export { api } from "./api";

// Export all API endpoints
export * from "./api/authApi";
export * from "./api/patientsApi";
export * from "./api/appointmentsApi";
export * from "./api/clinicsApi";

// Export types
export * from "./api/types";

// Export Redux provider
export { ReduxProvider } from "./ReduxProvider";

// Export axios instance for direct usage if needed
export { default as axiosInstance } from "./axios";
