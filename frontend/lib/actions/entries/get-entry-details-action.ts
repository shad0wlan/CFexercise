"use server";

import fetcher from "@/lib/api/fetcher";
import { Entry } from "@/lib/types/entry";
import { endpoints } from "@/lib/constants/endpoints";

export default async function getEntryDetailsAction(id: string) {
  return fetcher<Entry>({
    endpoint: `${endpoints.entries}/${id}`,
  });
}
