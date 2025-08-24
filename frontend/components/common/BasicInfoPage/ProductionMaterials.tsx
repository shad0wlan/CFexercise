import ReactSelect from "@/components/form/ReactSelect";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import { ProductionMaterial } from "@/lib/types/product-material";
import getProductionMaterialsAction from "@/lib/actions/production-materials/get-production-materials-action";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import BasicInfoSkeleton from "@/components/skeletons/BasicInfoSkeleton";

export default function ProductionMaterials() {
  return (
    <Suspense fallback={<BasicInfoSkeleton />}>
      <Await<ProductionMaterial[]>
        resolve={getProductionMaterialsAction}
        errorFallback={(error) => <LocalPageError error={error} />}
      >
        {(productionMaterials) => {
          const productionMaterialOptions = productionMaterials.map(
            (productionMaterial) => ({
              value: productionMaterial.id,
              label: productionMaterial.name,
            }),
          );
          return (
            <div className="flex items-center">
              <ReactSelect
                options={productionMaterialOptions}
                endpoint={endpoints.productionMaterials}
                tag={tags.productionMaterials}
                placeholder="Υλικά παραγωγής"
              />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
