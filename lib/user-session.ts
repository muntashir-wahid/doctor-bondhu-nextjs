"server only";

import { cookies } from "next/headers";
import { ME_KEY, USER_SESSION_COOKIE_NAME } from "./http/constants";
import { IMe } from "./interfaces/me.interface";

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
  cookieStore.delete(ME_KEY);
}

export async function setMe(user: IMe) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60; // 1 hour
  const me = JSON.stringify(user);

  cookieStore.set({
    name: ME_KEY,
    value: me,
    httpOnly: true,
    maxAge: maxAge,
    secure: true,
  });
}

export async function getMe() {
  const cookieStore = await cookies();
  const me = cookieStore.get(ME_KEY);
  return me ? JSON.parse(me.value) : null;
}
