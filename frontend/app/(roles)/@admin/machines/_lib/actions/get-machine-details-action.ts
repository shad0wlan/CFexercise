"use server";

import fetcher from "@/lib/api/fetcher";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import { endpoints } from "@/lib/constants/endpoints";

export default async function getMachineDetailsAction(id: string) {
  return fetcher<Machine>({
    endpoint: `${endpoints.machines}/${id}`,
  });
}
