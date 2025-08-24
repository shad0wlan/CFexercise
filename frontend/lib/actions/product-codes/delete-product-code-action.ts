"use server";

import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { revalidateTag } from "next/cache";
import { tags } from "@/lib/constants/tags";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

export default async function deleteProductCodeAction(id: number) {
  const response = await mutateData({
    endpoint: `${endpoints.productCodes}/${id}`,
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch((_) => null);
    return {
      isError: true,
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tags.productCodes);
}
