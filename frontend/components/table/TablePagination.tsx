import { IoChevronForwardOutline, IoChevronBack } from "react-icons/io5";
import Text from "@/components/ui/Text";

type Props = {
  table: any;
};

export const TablePagination = (props: Props) => {
  const { table } = props;

  const pageIndex = table.getState().pagination.pageIndex;
  const rowsLength = table.getRowModel().rows.length;
  const totalRows = table.getPrePaginationRowModel().rows.length;
  const previousRowsCount = pageIndex * table.getState().pagination.pageSize;
  const currentResultsCount = previousRowsCount + rowsLength;
  const resultsText = totalRows === 1 ? "αποτέλεσμα" : "αποτελέσμπατα";
  const borderClasses =
    "cursor-pointer text-black disabled:cursor-not-allowed w-[30px] h-[30px] flex items-center justify-center transition-all duration-200 hover:bg-gray-100 disabled:text-gray-500";

  return (
    totalRows > 0 && (
      <div className="flex flex-wrap items-center justify-between mt-2 text-gray-500 text-size-18 px-10">
        <span className="flex items-center gap-1">
          <Text>
            <b>{currentResultsCount}</b>
          </Text>
          <Text>{`${resultsText} από`}</Text>
          <Text>{totalRows}</Text>
        </span>
        <div className="flex items-center gap-2 md:gap-8">
          <span className="flex items-center gap-1">
            <Text>Σελίδα</Text>
            <Text>
              <b>{pageIndex + 1}</b>
            </Text>
            <Text>{`από ${table.getPageCount() || 1}`}</Text>
          </span>
          <div className="flex items-center gap-2">
            <button
              className={borderClasses}
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IoChevronBack />
            </button>
            <button
              className={borderClasses}
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
