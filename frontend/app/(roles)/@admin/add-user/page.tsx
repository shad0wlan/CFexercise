import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import UserForm from "@/app/(roles)/@admin/_components/UserForm";
import Text from "@/components/ui/Text";
import BackButton from "@/components/ui/BackButton";
import { titles } from "@/lib/constants/titles";

export default function AddUser() {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.addUser}
          </Text>
        </ContentHeaderWrapper>
        <UserForm
          method="post"
          successMessage="Ο χρήστης δημιουργήθηκε επιτυχώς"
          submitButtonText="ΔΗΜΙΟΥΡΓΙΑ ΧΡΗΣΤΗ"
        />
      </ContentWrapper>
    </>
  );
}
