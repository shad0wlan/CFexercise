import { flexRender, Table } from "@tanstack/react-table";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils/cn";

type Props = {
  table: Table<any>;
};
const TableBody = ({ table }: Props) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            const textAlign = cell.column.columnDef.meta?.align ?? "text-left";
            return (
              <Text
                as="td"
                key={cell.id}
                className={cn(
                  `p-5 first:border-l last:border-r border-y first:rounded-l-lg last:rounded-r-lg ${textAlign}`,
                  {
                    [cell.column.columnDef.meta?.colYPadding ?? "py-0"]:
                      !!cell.column.columnDef.meta?.colYPadding,
                  },
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Text>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
