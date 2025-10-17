import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for handling API errors
export const useApiError = () => {
  const handleError = (error: any) => {
    if (error?.status === 401) {
      // Handle unauthorized error
      console.error("Unauthorized access");
      // Redirect to login or refresh token
    } else if (error?.status === 403) {
      // Handle forbidden error
      console.error("Access forbidden");
    } else if (error?.status >= 500) {
      // Handle server errors
      console.error("Server error occurred");
    } else if (error?.data?.message) {
      // Handle API error messages
      console.error(error.data.message);
    } else {
      // Handle generic errors
      console.error("An error occurred");
    }
  };

  return { handleError };
};

// Custom hook for managing loading states
export const useApiState = () => {
  const getLoadingState = (isLoading: boolean, isFetching: boolean) => ({
    isLoading: isLoading || isFetching,
    isInitialLoading: isLoading,
    isRefetching: isFetching && !isLoading,
  });

  return { getLoadingState };
};

// Custom hook for pagination
export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = React.useState(initialPage);
  const [limit, setLimit] = React.useState(initialLimit);

  const resetPagination = () => {
    setPage(1);
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const goToPage = (pageNumber: number) => setPage(Math.max(1, pageNumber));

  return {
    page,
    limit,
    setPage,
    setLimit,
    resetPagination,
    nextPage,
    prevPage,
    goToPage,
  };
};
