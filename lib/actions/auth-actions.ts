"use server";

import apiClient from "../http/api-client";
// import jwt from "jsonwebtoken";

import { clearUserSession, setUserSession } from "../user-session";

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

// export async function fetchMe() {
//   const userSession = await getUserSession();
//   if (!userSession) {
//     return null;
//   }

//   const me = jwt.decode(userSession);

//   return me;
// }
