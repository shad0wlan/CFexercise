"use server";

import mutateData from "@/lib/api/mutateData";
import { endpoints } from "@/lib/constants/endpoints";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/constants/routes";

export default async function deleteEntryAction(id: number) {
  const response = await mutateData({
    endpoint: `${endpoints.entries}/${id}`,
    method: "DELETE",
  });

  if (!response.ok) {
    return { isError: true };
  }

  revalidatePath(routes.home);
}
