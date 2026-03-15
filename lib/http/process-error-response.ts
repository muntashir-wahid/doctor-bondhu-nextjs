import { redirect } from "next/navigation";

export function processErrorResponse(error: any) {
  if (error.status === 401 || error.status === 403) {
    redirect("/logout");
  }

  return {
    message: error.message || "An unexpected error occurred. Please try again.",
    status: error.status || 500,
  };
}
