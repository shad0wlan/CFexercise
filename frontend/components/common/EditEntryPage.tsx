import getMachinesAction from "@/app/(roles)/@admin/machines/_lib/actions/get-machines-action";
import getProductionMaterialsAction from "@/lib/actions/production-materials/get-production-materials-action";
import getPackageTypesAction from "@/lib/actions/package-types/get-package-types-action";
import getColorsAction from "@/lib/actions/colors/get-colors-action";
import getExtrasAction from "@/lib/actions/extras/get-extras-action";
import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import { Entry } from "@/lib/types/entry";
import getEntryDetailsAction from "@/lib/actions/entries/get-entry-details-action";
import LocalPageError from "@/components/common/LocalPageError";
import moment from "moment/moment";
import EntryForm from "@/components/common/EntryForm/EntryForm";
import userRoleAction from "@/lib/actions/user/user-role-action";
import EntrySkeleton from "@/components/skeletons/EntrySkeleton";
import { titles } from "@/lib/constants/titles";
import getProductCodesAction from "@/lib/actions/product-codes/get-product-codes-action";

type Props = {
  entryId: string;
};

export default async function EditEntryPage({ entryId }: Props) {
  const { data: machines } = await getMachinesAction();
  const { data: productCodes } = await getProductCodesAction();
  const { data: colors } = await getColorsAction();
  const { data: packageTypes } = await getPackageTypesAction();
  const { data: productionMaterials } = await getProductionMaterialsAction();
  const { data: extras } = await getExtrasAction();

  const role = await userRoleAction();
  const isWorker = role === "Worker";
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.editEntry}
          </Text>
        </ContentHeaderWrapper>
        <Suspense fallback={<EntrySkeleton />}>
          <Await<Entry>
            resolve={() => getEntryDetailsAction(entryId)}
            errorFallback={(error) => <LocalPageError error={error} />}
          >
            {(entry) => (
              <EntryForm
                method="patch"
                entry={entry}
                successMessage="Η καταχώρηση ενημερώθηκε επιτυχώς"
                submitButtonText="ΑΠΟΘΗΚΕΥΣΗ"
                machines={machines}
                productionMaterials={productionMaterials}
                packageTypes={packageTypes}
                colors={colors}
                extras={extras}
                productCodes={productCodes}
                isWorker={isWorker}
                defaultValues={{
                  machineId: entry.machine.id.toString(),
                  productionMaterialId: entry.productionMaterial.id.toString(),
                  packageTypeId: entry.packageType.id.toString(),
                  colorId: entry.color.id.toString(),
                  extraId: entry.extra?.id.toString() ?? "",
                  colorPercentage: entry.colorPercentage,
                  productCodeId: entry.productCode.id.toString(),
                  weightPerMeter: entry.weightPerMeter,
                  weightTotal: entry.weightTotal,
                  productionForStock: entry.productionForStock,
                  width: entry.width,
                  thickness: entry.thickness,
                  cannonTemp: entry.cannonTemp,
                  speed: entry.speed,
                  printerText: entry?.printerText ?? "",
                  kgRecycling: entry?.kgRecycling ?? null,
                  productionDate: moment(entry?.productionDate).isValid()
                    ? moment(entry.productionDate).format("YYYY-MM-DDTHH:mm")
                    : "",
                  notes: entry?.notes ?? "",
                }}
              />
            )}
          </Await>
        </Suspense>
      </ContentWrapper>
    </>
  );
}
