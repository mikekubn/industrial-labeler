import type { RecordResponseSchema } from "@/services/record/schemes/recod";

import { flexRender, type Table } from "@tanstack/react-table";

interface HeaderProps {
  table: Table<RecordResponseSchema>;
}

const Header = ({ table }: HeaderProps) => {
  return (
    <thead className="bg-gray-100 z-10">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="sticky top-0 z-10 bg-gray-100 border-b border-r p-2 text-left shadow-[0_1px_0_rgba(209,213,219,1)] last:border-r-0"
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""} absolute right-0 top-0 h-full w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400`}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export { Header };
