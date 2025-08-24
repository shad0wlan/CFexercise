import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import { titles } from "@/lib/constants/titles";
import ProductCodeForm from "@/components/common/ProductCodeForm/ProductCodeForm";

export default async function AddProductCodePage() {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.addProductCode}
          </Text>
        </ContentHeaderWrapper>
        <ProductCodeForm
          method="post"
          successMessage="Ο κωδικός προιοντος δημιουργήθηκε επιτυχώς"
          submitButtonText="ΔΗΜΙΟΥΡΓΙΑ ΚΩΔΙΚΟΥ ΠΡΟΙΟΝΤΟΣ"
        />
      </ContentWrapper>
    </>
  );
}
