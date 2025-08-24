"use server";

import { CreateUserForm } from "@/app/(roles)/@admin/_lib/types/user-form";
import mutateData from "@/lib/api/mutateData";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import { endpoints } from "@/lib/constants/endpoints";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

export default async function createUserAction(values: CreateUserForm) {
  const response = await mutateData<CreateUserForm>({
    endpoint: endpoints.users,
    method: "POST",
    body: values,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: errorMessageResponse(data),
    };
  }

  redirect(`${routes.home}?role=${data?.role}`);
}
