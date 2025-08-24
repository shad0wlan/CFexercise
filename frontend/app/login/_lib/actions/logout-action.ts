"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";

export default async function logoutAction(withRedirect = false) {
  cookies().delete("accessToken");
  cookies().delete("user");

  if (withRedirect) {
    redirect(routes.login);
  }
}
