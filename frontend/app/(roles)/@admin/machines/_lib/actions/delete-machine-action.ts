"use server";

import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

export default async function deleteMachineAction(id: number) {
  const response = await mutateData({
    endpoint: `${endpoints.machines}/${id}`,
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch((_) => null);
    return {
      isError: true,
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tags.machines);
}
