"use server";

import { User } from "@/lib/types/user";
import { cookies } from "next/headers";
import { DecodedToken } from "@/app/login/_lib/types/token";
import { jwtDecode } from "jwt-decode";

export default async function saveUserAction(user: User | null) {
  const accessToken = cookies().get("accessToken")?.value;
  if (user && accessToken) {
    const decodedToken: DecodedToken = jwtDecode(accessToken);
    cookies().set("user", JSON.stringify(user), {
      sameSite: "strict",
      secure: true,
      httpOnly: true,
      maxAge: (decodedToken.exp * 1000 - Date.now()) / 1000,
    });
  }
}
