"use client";
import { Machine } from "@/app/(roles)/@admin/machines/_lib/type/machine";
import Table from "@/components/table/Table";
import { ColumnDef } from "@tanstack/table-core";
import { useMemo } from "react";
import { routes } from "@/lib/constants/routes";
import Image from "next/image";
import Text from "@/components/ui/Text";
import TableActions from "@/components/table/TableActions";
import deleteMachineAction from "@/app/(roles)/@admin/machines/_lib/actions/delete-machine-action";
import { titles } from "@/lib/constants/titles";

type Props = {
  machines: Machine[];
};

export default function MachinesTable({ machines = [] }: Props) {
  const columns: ColumnDef<Machine>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Όνομα",
        accessorKey: "name",
      },
      {
        header: "Εικόνα",
        accessorKey: "image",
        cell: ({ row }) => {
          const image = row.original.image;
          const fullImagePath = `${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`;

          return image ? (
            <a
              href={fullImagePath}
              target="_blank"
              rel="noreferrer"
              className="relative"
            >
              <Image
                width={80}
                height={80}
                src={fullImagePath}
                alt="machine image"
              />
            </a>
          ) : (
            <Text>Δεν βρέθηκε εικόνα</Text>
          );
        },
        meta: {
          colYPadding: "py-0",
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <TableActions
            onEdit={`${routes.machines}/${row.original.id}`}
            onDelete={() => deleteMachineAction(row.original.id)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Table
      data={machines}
      columns={columns}
      title={titles.machines}
      linkLabel="ΠΡΟΣΘΗΚΗ ΜΗΧΑΝΗΣ"
      linkHref={routes.addMachine}
    />
  );
}
