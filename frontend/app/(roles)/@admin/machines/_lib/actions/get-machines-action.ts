"use server";

import fetcher from "@/lib/api/fetcher";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";

export default async function getMachinesAction() {
  return fetcher<Machine[]>({
    endpoint: endpoints.machines,
    options: {
      next: {
        tags: [tags.machines],
      },
    },
  });
}
