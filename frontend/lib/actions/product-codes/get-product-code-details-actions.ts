"use server";

import fetcher from "@/lib/api/fetcher";
import { endpoints } from "@/lib/constants/endpoints";
import { ProductCode } from "@/lib/types/product-code";

export default async function getProductCodeDetailsAction(id: string) {
  return fetcher<ProductCode>({
    endpoint: `${endpoints.productCodes}/${id}`,
  });
}
