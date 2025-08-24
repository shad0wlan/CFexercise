import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import { titles } from "@/lib/constants/titles";
import { Suspense } from "react";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import { ProductCode } from "@/lib/types/product-code";
import ProductCodeForm from "@/components/common/ProductCodeForm/ProductCodeForm";
import getProductCodeDetailsAction from "@/lib/actions/product-codes/get-product-code-details-actions";

export default function EditProductCodePage({ id }: { id: string }) {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.editProductCode}
          </Text>
        </ContentHeaderWrapper>
        <Suspense fallback={<FormSkeleton />}>
          <Await<ProductCode>
            resolve={() => getProductCodeDetailsAction(id)}
            errorFallback={(error) => <LocalPageError error={error} />}
          >
            {(productCode) => (
              <ProductCodeForm
                method="patch"
                productCode={productCode}
                successMessage="Ο κωδικός προιοντος ενημερώθηκε επιτυχώς"
                submitButtonText="ΕΠΕΞΕΡΓΑΣΙΑ ΚΩΔΙΚΟΥ ΠΡΟΙΟΝΤΟΣ"
              />
            )}
          </Await>
        </Suspense>
      </ContentWrapper>
    </>
  );
}
