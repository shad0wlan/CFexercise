"use server";

import fetcher from "@/lib/api/fetcher";
import { tags } from "@/lib/constants/tags";
import { endpoints } from "@/lib/constants/endpoints";
import { PackageType } from "@/lib/types/package-type";

export default async function getPackageTypesAction() {
  return fetcher<PackageType[]>({
    endpoint: `${endpoints.packageTypes}`,
    options: {
      next: {
        tags: [tags.packageTypes],
      },
    },
  });
}
