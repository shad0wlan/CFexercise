"use server";

import fetcher from "@/lib/api/fetcher";
import { Color } from "@/lib/types/color";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";

export default async function getColorsAction() {
  return fetcher<Color[]>({
    endpoint: endpoints.colors,
    options: {
      next: {
        tags: [tags.colors],
      },
    },
  });
}
