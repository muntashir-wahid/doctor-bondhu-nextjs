"use server";

import { Role } from "@/app/(public)/clinics/[id]/(clinic-logins)/member-login/components/login-form";
import apiClient from "../http/api-client";

import {
  clearUserSession,
  getMe,
  setMe,
  setUserSession,
} from "../user-session";

export async function superAdminLogin(email: string, password: string) {
  let data = null;
  let error = null;

  try {
    const loginResponse = await apiClient.post("auth/adminum-login", {
      email: email,
      password: password,
    });
    data = loginResponse;

    if (loginResponse.data.accessToken) {
      setUserSession(loginResponse.data.accessToken);
      setMe(loginResponse.data.user);
    }
  } catch (err: any) {
    error = {
      message: err.message || "An error occurred during login",
    };
  }

  return { data, error };
}

export async function clinicUserLogin(
  email: string,
  password: string,
  role: Role,
  clinicUid: string,
) {
  let data = null;
  let error = null;

  try {
    const loginResponse = await apiClient.post("auth/login", {
      email: email,
      password: password,
      role: role,
      clinicUid: clinicUid,
    });
    data = loginResponse;

    if (loginResponse.data.accessToken) {
      setUserSession(loginResponse.data.accessToken);
      setMe(loginResponse.data.user);
    }
  } catch (err: any) {
    error = {
      message: err.message || "An error occurred during login",
    };
  }

  return { data, error };
}

export async function userLogout() {
  await clearUserSession();
}

export async function fetchMe() {
  const me = await getMe();
  return me;
}

export async function logout() {
  await clearUserSession();
}
