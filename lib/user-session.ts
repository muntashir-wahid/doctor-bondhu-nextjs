"server only";

import { cookies } from "next/headers";
import { USER_SESSION_COOKIE_NAME } from "./http/constants";

export async function setUserSession(token: string) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60; // 1 hour

  cookieStore.set({
    name: USER_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    maxAge: maxAge,
    secure: true,
  });
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const userSession = cookieStore.get(USER_SESSION_COOKIE_NAME);
  return userSession ? userSession.value : null;
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE_NAME);
}

export async function getMe() {
  const token = await getUserSession();

  if (!token) {
    return null;
  }
}
