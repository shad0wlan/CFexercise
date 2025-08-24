"use server";

import { UpdateUserForm } from "@/app/(roles)/@admin/_lib/types/user-form";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import saveUserAction from "@/app/login/_lib/actions/save-user-action";
import { User } from "@/lib/types/user";

export default async function updateUserAction(
  values: UpdateUserForm,
  id?: string,
  isProfile?: boolean,
) {
  const response = await mutateData({
    endpoint: `${endpoints.users}/${id}`,
    method: "PATCH",
    body: values,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: errorMessageResponse(data),
    };
  }

  if (isProfile) {
    await saveUserAction(data as User);
    return;
  }

  redirect(`${routes.home}?role=${data?.role}`);
}
