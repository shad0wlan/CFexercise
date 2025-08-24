import getUserAction from "@/lib/actions/user/get-user-action";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import UserForm from "@/app/(roles)/@admin/_components/UserForm";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import gerUserDetailsAction from "@/app/(roles)/@admin/_lib/actions/get-user-details-action";
import LocalPageError from "@/components/common/LocalPageError";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { titles } from "@/lib/constants/titles";

export default async function Profile() {
  const user = await getUserAction();

  return (
    <ContentWrapper>
      <ContentHeaderWrapper>
        <Text as="h2" className="text-2xl" isTitle>
          {titles.userProfile}
        </Text>
      </ContentHeaderWrapper>
      {user && (
        <Suspense fallback={<FormSkeleton />}>
          <Await
            resolve={() => gerUserDetailsAction(user?.id)}
            errorFallback={(error) => <LocalPageError error={error} />}
          >
            {(user) => (
              <UserForm
                isProfile
                method="patch"
                user={user}
                successMessage="Τα στοιχεία σας ενημερώθηκαν επιτυχώς"
                submitButtonText="ΑΠΟΘΗΚΕΥΣΗ"
              />
            )}
          </Await>
        </Suspense>
      )}
    </ContentWrapper>
  );
}
