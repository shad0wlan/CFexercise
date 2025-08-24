import Await from "@/components/common/Await";
import getMachinesAction from "@/app/(roles)/@admin/machines/_lib/actions/get-machines-action";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import MachinesTable from "@/app/(roles)/@admin/machines/_components/MachinesTable";
import LocalPageError from "@/components/common/LocalPageError";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { titles } from "@/lib/constants/titles";

export default function MachinesList() {
  return (
    <Suspense fallback={<TableSkeleton title={titles.machines} />}>
      <Await<Machine[]>
        errorFallback={(error) => <LocalPageError error={error} />}
        resolve={getMachinesAction}
      >
        {(machines) => <MachinesTable machines={machines} />}
      </Await>
    </Suspense>
  );
}
