import EntryForm from "@/components/common/EntryForm/EntryForm";
import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import getMachinesAction from "@/app/(roles)/@admin/machines/_lib/actions/get-machines-action";
import getProductionMaterialsAction from "@/lib/actions/production-materials/get-production-materials-action";
import getPackageTypesAction from "@/lib/actions/package-types/get-package-types-action";
import getColorsAction from "@/lib/actions/colors/get-colors-action";
import getExtrasAction from "@/lib/actions/extras/get-extras-action";
import { titles } from "@/lib/constants/titles";
import getProductCodesAction from "@/lib/actions/product-codes/get-product-codes-action";

export default async function NewEntry() {
  const { data: machines } = await getMachinesAction();
  const { data: productCodes } = await getProductCodesAction();
  const { data: colors } = await getColorsAction();
  const { data: packageTypes } = await getPackageTypesAction();
  const { data: productionMaterials } = await getProductionMaterialsAction();
  const { data: extras } = await getExtrasAction();

  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.addEntry}
          </Text>
        </ContentHeaderWrapper>
        <EntryForm
          method="post"
          successMessage="Επιτυχής καταχώρηση"
          submitButtonText="ΚΑΤΑΧΩΡΗΣΗ"
          machines={machines}
          productionMaterials={productionMaterials}
          packageTypes={packageTypes}
          colors={colors}
          extras={extras}
          productCodes={productCodes}
        />
      </ContentWrapper>
    </>
  );
}
