import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import MachineForm from "@/app/(roles)/@admin/machines/_components/MachineForm";
import { titles } from "@/lib/constants/titles";

export default function Page() {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.addMachine}
          </Text>
        </ContentHeaderWrapper>
        <MachineForm
          method="post"
          successMessage="Η μηχανή δημιουργήθηκε επιτυχώς"
          submitButtonText="ΔΗΜΙΟΥΡΓΙΑ ΜΗΧΑΝΗΣ"
        />
      </ContentWrapper>
    </>
  );
}
