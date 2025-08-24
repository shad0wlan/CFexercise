import { flexRender, Table } from "@tanstack/react-table";
import Text from "@/components/ui/Text";

type Props = {
  table: Table<any>;
};
const TableHeader = ({ table }: Props) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Text
              as="th"
              key={header.id}
              className="px-5 pb-4 text-left text-sm"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </Text>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
