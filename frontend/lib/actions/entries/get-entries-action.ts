"use server";

import fetcher from "@/lib/api/fetcher";
import { endpoints } from "@/lib/constants/endpoints";
import { Entry, SearchParamsStatus } from "@/lib/types/entry";

export default async function getEntriesAction(status: SearchParamsStatus) {
  return fetcher<Entry[]>({
    endpoint: `${endpoints.entries}?status=${status}`,
  });
}
