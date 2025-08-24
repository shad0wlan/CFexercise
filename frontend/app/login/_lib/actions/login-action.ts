"use server";

import { Login } from "@/app/login/_lib/types/login";
import { endpoints } from "@/lib/constants/endpoints";
import { messages } from "@/lib/constants/messages";
import { DecodedToken, Token } from "@/app/login/_lib/types/token";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import getAuthUserAction from "@/app/login/_lib/actions/get-auth-user-action";

export default async function loginAction(values: Login) {
  const response = await fetch(`${process.env.API_URL}${endpoints.login}`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data?.detail ?? messages.serverError,
    };
  }

  const token: Token = data;
  const decodedToken: DecodedToken = jwtDecode(token.accessToken);

  cookies().set("accessToken", token.accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: (decodedToken.exp * 1000 - Date.now()) / 1000,
  });

  return getAuthUserAction();
}
