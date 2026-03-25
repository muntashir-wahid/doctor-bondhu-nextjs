"use server";

import { revalidateTag } from "next/cache";
import apiClient from "../http/api-client";
import { processErrorResponse } from "../http/process-error-response";

/*
////// TYPE DEFINITIONS //////
*/
export interface IClinicService {
  name: string;
  description?: string;
}

export interface IClinicFacility {
  name: string;
  description?: string;
}

export interface IWorkingHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export interface IClinicOwner {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateClinicPayload {
  name: string;
  address: string;
  contact: string;
  email: string;
  type: string;
  clinicBanner: string;
  website: string;
  services: IClinicService[];
  facilities: IClinicFacility[];
  workingHours: IWorkingHour[];
  owner: IClinicOwner;
}

/*
////// CACHE KEYS //////
*/

const CLINICS_CACHE_KEYS = {
  ALL: "clinics",
  details: (id: string) => `clinic:${id}`,
};

/*
////// ACTIONS //////
*/

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

export async function createClinic(payload: ICreateClinicPayload) {
  let data = null;
  let error = null;

  try {
    const response = await apiClient.post("clinics", payload);
    data = response;
    revalidateTag(CLINICS_CACHE_KEYS.ALL);
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
