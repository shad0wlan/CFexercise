import { Role, User } from "@/lib/types/user";
import Await from "@/components/common/Await";
import UsersTable from "@/app/(roles)/@admin/_components/UsersTable";
import getUsersAction from "@/app/(roles)/@admin/_lib/actions/get-users-action";
import LocalPageError from "@/components/common/LocalPageError";
import { Suspense } from "react";
import ContentWrapper from "@/components/ui/ContentWrapper";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { titles } from "@/lib/constants/titles";

type Props = {
  roleType: Role;
};

export default function UsersList({ roleType }: Props) {
  return (
    <Suspense fallback={<TableSkeleton title={titles.users} />}>
      <Await<User[]>
        errorFallback={(error) => <LocalPageError error={error} />}
        resolve={() => getUsersAction(roleType)}
      >
        {(users) => <UsersTable users={users} />}
      </Await>
    </Suspense>
  );
}
