"use server";

import fetcher from "@/lib/api/fetcher";
import { tags } from "@/lib/constants/tags";
import { endpoints } from "@/lib/constants/endpoints";
import { Extra } from "@/lib/types/extra";

export default async function getExtrasAction() {
  return fetcher<Extra[]>({
    endpoint: `${endpoints.extras}`,
    options: {
      next: {
        tags: [tags.extras],
      },
    },
  });
}
