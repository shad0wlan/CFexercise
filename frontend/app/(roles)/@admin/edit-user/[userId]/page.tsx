import BackButton from "@/components/ui/BackButton";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import UserForm from "@/app/(roles)/@admin/_components/UserForm";
import { User } from "@/lib/types/user";
import gerUserDetails from "@/app/(roles)/@admin/_lib/actions/get-user-details-action";
import LocalPageError from "@/components/common/LocalPageError";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { titles } from "@/lib/constants/titles";

export default async function EditUser({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <>
      <BackButton />
      <ContentWrapper className="mt-0">
        <ContentHeaderWrapper>
          <Text as="h2" className="text-2xl" isTitle>
            {titles.editUser}
          </Text>
        </ContentHeaderWrapper>
        <Suspense fallback={<FormSkeleton />}>
          <Await<User>
            resolve={() => gerUserDetails(params.userId)}
            errorFallback={(error) => <LocalPageError error={error} />}
          >
            {(user) => (
              <UserForm
                method="patch"
                user={user}
                successMessage="Ο χρήστης ενημερώθηκε επιτυχώς"
                submitButtonText="ΕΠΕΞΕΡΓΑΣΙΑ ΧΡΗΣΤΗ"
              />
            )}
          </Await>
        </Suspense>
      </ContentWrapper>
    </>
  );
}
