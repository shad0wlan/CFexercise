"use server";

import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants/routes";

export default async function updateMachineAction(
  formData: FormData,
  id?: number,
) {
  const response = await mutateData({
    endpoint: `${endpoints.machines}/${id}`,
    body: formData,
    method: "PATCH",
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tags.machines);
  redirect(routes.machines);
}
