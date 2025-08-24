"use server";

import mutateData from "@/lib/api/mutateData";
import { revalidateTag } from "next/cache";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

type Args = {
  endpoint: string;
  tag: string;
  id?: number;
  newName?: string;
};
export default async function updateBasicInfoAction({
  endpoint,
  tag,
  id,
  newName,
}: Args) {
  if (!id && !newName) {
    return {
      message: "Δεν είναι δυνατή η ενημέρωση του στοιχείου",
    };
  }

  const response = await mutateData({
    endpoint: `${endpoint}/${id}`,
    method: "PATCH",
    body: { name: newName },
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tag);
}
