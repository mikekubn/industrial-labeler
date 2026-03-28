import type { Table } from "@tanstack/react-table";
import type { RecordResponseSchema } from "@/services/record/schemes/recod";

interface PaginationProps {
  table: Table<RecordResponseSchema>;
}

const Pagination = ({ table }: PaginationProps) => {
  const limits = [10, 25, 50, 100];

  return (
    <div className="flex flex-row justify-center items-center gap-2 py-4">
      <button
        className="border rounded p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="border rounded p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Strana</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Strana:
        <input
          type="number"
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const p = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(p);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {limits.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Pagination };
