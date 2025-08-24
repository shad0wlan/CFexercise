import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableHeader from "@/components/table/TableHeader";
import TableBody from "@/components/table/TableBody";
import { RowData } from "@tanstack/table-core";
import TableWrapper from "@/components/table/TableWrapper";
import { useState } from "react";
import { TablePagination } from "@/components/table/TablePagination";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "text-left" | "text-center" | "text-right";
    colYPadding?: string;
  }
}

type Props = {
  data: any[];
  columns: any[];
  title: string;
  linkHref?: string;
  linkLabel?: string;
  children?: React.ReactNode;
};
const Table = ({
  data,
  columns,
  title,
  linkLabel,
  linkHref,
  children,
}: Props) => {
  const [search, setSearch] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearch,
    state: {
      globalFilter: search,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  return (
    <>
      <TableWrapper
        title={title}
        linkLabel={linkLabel}
        linkHref={linkHref}
        search={search}
        setSearch={setSearch}
      >
        {children}
        <table className="w-full border-separate border-spacing-y-2.5 min-w-[1200px]">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
        {table.getRowModel().rows.length === 0 && (
          <div className="flex-center w-full my-5 text-lg text-muted-foreground">
            Δεν βρέθηκαν δεδομένα
          </div>
        )}
      </TableWrapper>
      <TablePagination table={table} />
    </>
  );
};

export default Table;
