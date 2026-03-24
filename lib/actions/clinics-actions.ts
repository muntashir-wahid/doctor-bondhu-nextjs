"use server";

import apiClient from "../http/api-client";
import { processErrorResponse } from "../http/process-error-response";

const CLINICS_CACHE_KEYS = {
  ALL: "clinics",
  details: (id: string) => `clinic:${id}`,
};

export async function getAllClinics() {
  let data = null;
  let error = null;

  try {
    const clientResponse = await apiClient.get("clinics", {
      cache: "force-cache",
      next: { tags: [CLINICS_CACHE_KEYS.ALL] },
    });

    data = clientResponse;
  } catch (err: any) {
    error = processErrorResponse(err);
  }
  return { data, error };
}

export async function getClinicDetails(id: string) {
  let data = null;
  let error = null;

  try {
    const clientResponse = await apiClient.get(`clinics/${id}`, {
      cache: "force-cache",
      next: { tags: [CLINICS_CACHE_KEYS.details(id)] },
    });

    data = clientResponse;
  } catch (err: any) {
    error = processErrorResponse(err);
  }
  return { data, error };
}
