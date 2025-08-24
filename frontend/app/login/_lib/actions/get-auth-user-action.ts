"use server";

import fetcher from "@/lib/api/fetcher";
import { User } from "@/lib/types/user";
import { endpoints } from "@/lib/constants/endpoints";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import logoutAction from "@/app/login/_lib/actions/logout-action";
import saveUserAction from "@/app/login/_lib/actions/save-user-action";

export default async function getAuthUserAction() {
  const { data, error } = await fetcher<User>({
    endpoint: endpoints.authUser,
  });

  if (error) {
    await logoutAction();
    return {
      message: error,
    };
  }

  await saveUserAction(data);

  redirect(routes.home);
}
