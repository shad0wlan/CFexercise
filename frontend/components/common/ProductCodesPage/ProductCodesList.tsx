import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { titles } from "@/lib/constants/titles";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import getProductCodesAction from "@/lib/actions/product-codes/get-product-codes-action";
import { ProductCode } from "@/lib/types/product-code";
import ProductCodesTable from "@/components/common/ProductCodesPage/ProductCodesTable";

export default function ProductCodesList() {
  return (
    <Suspense fallback={<TableSkeleton title={titles.productCodes} />}>
      <Await<ProductCode[]>
        errorFallback={(error) => <LocalPageError error={error} />}
        resolve={getProductCodesAction}
      >
        {(productCodes) => <ProductCodesTable productCodes={productCodes} />}
      </Await>
    </Suspense>
  );
}
