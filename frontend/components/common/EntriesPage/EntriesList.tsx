import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import getEntriesAction from "@/lib/actions/entries/get-entries-action";
import { Entry, SearchParamsStatus } from "@/lib/types/entry";
import userRoleAction from "@/lib/actions/user/user-role-action";
import EntriesTable from "@/components/common/EntriesPage/EntriesTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { titles } from "@/lib/constants/titles";

type Props = {
  status: SearchParamsStatus;
};

export default async function EntriesList({ status }: Props) {
  const role = await userRoleAction();
  const isWorker = role === "Worker";
  return (
    <Suspense fallback={<TableSkeleton title={titles.entries} />}>
      <Await<Entry[]>
        resolve={() => getEntriesAction(status)}
        errorFallback={(error) => <LocalPageError error={error} />}
      >
        {(entries) => <EntriesTable entries={entries} isWorker={isWorker} />}
      </Await>
    </Suspense>
  );
}
