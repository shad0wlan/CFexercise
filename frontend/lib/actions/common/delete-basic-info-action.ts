"use server";

import mutateData from "@/lib/api/mutateData";
import { revalidateTag } from "next/cache";
import { errorMessageResponse } from "@/lib/utils/error-message-response";
import { messages } from "@/lib/constants/messages";

type Args = {
  endpoint: string;
  tag: string;
  id?: number;
};
export default async function deleteBasicInfoAction({
  endpoint,
  tag,
  id,
}: Args) {
  if (!id) {
    return {
      message: messages.idIsMissing,
    };
  }

  const response = await mutateData({
    endpoint: `${endpoint}/${id}`,
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    return {
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tag);
}
