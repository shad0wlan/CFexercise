"use client";
import { ProductCode } from "@/lib/types/product-code";
import { ColumnDef } from "@tanstack/table-core";
import { useMemo } from "react";
import TableActions from "@/components/table/TableActions";
import { routes } from "@/lib/constants/routes";
import deleteMachineAction from "@/app/(roles)/@admin/machines/_lib/actions/delete-machine-action";
import Table from "@/components/table/Table";
import { titles } from "@/lib/constants/titles";
import deleteProductCodeAction from "@/lib/actions/product-codes/delete-product-code-action";

type Props = {
  productCodes: ProductCode[];
};

export default function ProductCodesTable({ productCodes = [] }: Props) {
  const columns: ColumnDef<ProductCode>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Κωδικός",
        accessorKey: "code",
      },
      {
        header: "Κανόνι",
        accessorKey: "cannonTemp",
      },
      {
        header: "Τραβηχτικό",
        accessorKey: "speed",
      },

      {
        id: "actions",
        cell: ({ row }) => (
          <TableActions
            onEdit={`${routes.productCodes}/${row.original.id}`}
            onDelete={() => deleteProductCodeAction(row.original.id)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Table
      data={productCodes}
      columns={columns}
      title={titles.productCodes}
      linkLabel="ΠΡΟΣΘΗΚΗ ΚΩΔΙΚΟΥ ΠΡΟΙΟΝΤΟΣ"
      linkHref={routes.addProductCode}
    />
  );
}
