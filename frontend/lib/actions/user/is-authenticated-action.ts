"use server";

import getUserAction from "@/lib/actions/user/get-user-action";
import { cookies } from "next/headers";
import { DecodedToken } from "@/app/login/_lib/types/token";
import { jwtDecode } from "jwt-decode";

export default async function isAuthenticatedAction() {
  const user = await getUserAction();
  const accessToken = cookies().get("accessToken")?.value;

  if (user && accessToken) {
    const decodedToken: DecodedToken = jwtDecode(accessToken);

    return user.id === decodedToken.sid;
  }

  return false;
}
