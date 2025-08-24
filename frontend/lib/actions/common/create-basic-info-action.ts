"use server";

import mutateData from "@/lib/api/mutateData";
import { revalidateTag } from "next/cache";
import { errorMessageResponse } from "@/lib/utils/error-message-response";

type Args = {
  endpoint: string;
  tag: string;
  inputValue: string;
};

export default async function createBasicInfoAction({
  endpoint,
  tag,
  inputValue,
}: Args) {
  const response = await mutateData({
    endpoint,
    method: "POST",
    body: { name: inputValue },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: errorMessageResponse(data),
    };
  }

  revalidateTag(tag);
}
