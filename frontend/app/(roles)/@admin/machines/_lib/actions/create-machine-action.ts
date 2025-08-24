"use server";

import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

export default async function createMachineAction(formData: FormData) {
  const response = await mutateData({
    endpoint: endpoints.machines,
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tags.machines);
  redirect(routes.machines);
}
