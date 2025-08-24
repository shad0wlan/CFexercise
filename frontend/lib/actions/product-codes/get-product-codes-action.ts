"use server";

import fetcher from "@/lib/api/fetcher";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";
import { ProductCode } from "@/lib/types/product-code";

export default async function getProductCodesAction() {
  return fetcher<ProductCode[]>({
    endpoint: endpoints.productCodes,
    options: {
      next: {
        tags: [tags.productCodes],
      },
    },
  });
}
