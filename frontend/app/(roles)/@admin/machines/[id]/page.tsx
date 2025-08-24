import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import getMachineDetailsAction from "@/app/(roles)/@admin/machines/_lib/actions/get-machine-details-action";
import MachineForm from "@/app/(roles)/@admin/machines/_components/MachineForm";
import LocalPageError from "@/components/common/LocalPageError";
import { tags } from "@/lib/constants/tags";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { titles } from "@/lib/constants/titles";

export default async function EditMachine({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.editMachine}
          </Text>
        </ContentHeaderWrapper>
        <Suspense fallback={<FormSkeleton count={2} />}>
          <Await<Machine>
            resolve={() => getMachineDetailsAction(params.id)}
            errorFallback={(error) => <LocalPageError error={error} />}
          >
            {(machine) => (
              <MachineForm
                method="patch"
                machine={machine}
                successMessage="Η μηχανή ενημερώθηκε επιτυχώς"
                submitButtonText="ΕΠΕΞΕΡΓΑΣΙΑ ΜΗΧΑΝΗΣ"
              />
            )}
          </Await>
        </Suspense>
      </ContentWrapper>
    </>
  );
}
