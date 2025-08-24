"use server";

import fetcher from "@/lib/api/fetcher";
import { ProductionMaterial } from "@/lib/types/product-material";
import { tags } from "@/lib/constants/tags";
import { endpoints } from "@/lib/constants/endpoints";

export default async function getProductionMaterialsAction() {
  return fetcher<ProductionMaterial[]>({
    endpoint: `${endpoints.productionMaterials}`,
    options: {
      next: {
        tags: [tags.productionMaterials],
      },
    },
  });
}
