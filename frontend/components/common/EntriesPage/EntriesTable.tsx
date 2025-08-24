"use client";
import { Entry } from "@/lib/types/entry";
import Table from "@/components/table/Table";
import { routes } from "@/lib/constants/routes";
import EntriesTabs from "@/components/common/EntriesPage/EntriesTabs";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import TableActions from "@/components/table/TableActions";
import { formatDate } from "@/lib/utils/format-date";
import { EntryStatusEnum } from "@/lib/enums/entry-status";
import EntryStatus from "@/components/ui/EntryStatus";
import moment from "moment/moment";
import deleteEntryAction from "@/lib/actions/entries/delete-entry-action";
import { titles } from "@/lib/constants/titles";

type Props = {
  entries: Entry[];
  isWorker: boolean;
};

export default function EntriesTable({ entries = [], isWorker }: Props) {
  const columns: ColumnDef<Entry>[] = useMemo(
    () => [
      {
        header: "Κωδικός Προϊόντος",
        accessorFn: (row) => row.productCode.code,
      },
      {
        header: "Μηχανή",
        accessorFn: (row) => row.machine.name,
      },
      {
        header: "Χρήστης",
        accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
      },
      {
        header: "Υλικό Παραγωγής",
        accessorFn: (row) => row.productionMaterial.name,
      },
      {
        header: "Χρώμα",
        accessorFn: (row) => row.color.name,
      },
      {
        header: "Tύπος Συσκευασίας",
        accessorFn: (row) => row.packageType.name,
      },
      {
        header: "Ημ/νία Καταχώρησης",
        accessorFn: (row) => formatDate(row.createdAt),
      },
      {
        header: "Ημ/νία Επεξεργασίας",
        accessorFn: (row) =>
          moment(row.updatedAt).isValid() ? formatDate(row.updatedAt!) : "-",
      },
      {
        header: "Ημ/νία Παραγωγής",
        accessorFn: (row) =>
          moment(row.productionDate).isValid()
            ? formatDate(row.productionDate!)
            : "-",
      },
      {
        header: "Κατάσταση",
        accessorFn: (row) => EntryStatusEnum[row.status],
        cell: ({ row }) => <EntryStatus status={row.original.status} />,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <TableActions
            onEdit={`${routes.editEntry}/${row.original.id}`}
            onDelete={() => deleteEntryAction(row.original.id)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Table
      data={entries}
      columns={columns}
      title={titles.entries}
      linkLabel="ΠΡΟΣΘΗΚΗ ΚΑΤΑΧΩΡΗΣΗΣ"
      linkHref={isWorker ? routes.addEntry : undefined}
    >
      <EntriesTabs />
    </Table>
  );
}
