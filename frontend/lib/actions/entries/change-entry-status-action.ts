"use server";

import { EntryStatus } from "@/lib/types/entry";
import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { revalidatePath } from "next/cache";

export default async function changeEntryStatusAction(
  newStatus: EntryStatus,
  id: number,
) {
  if (!id) {
    return {
      isError: true,
    };
  }

  const response = await mutateData({
    endpoint: `${endpoints.entries}/${id}`,
    method: "PATCH",
    body: {
      status: newStatus,
    },
  });

  if (!response.ok) {
    return {
      isError: true,
    };
  }

  revalidatePath(endpoints.entries);
}
