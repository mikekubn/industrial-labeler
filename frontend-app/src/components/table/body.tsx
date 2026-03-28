import type { RecordResponseSchema } from "@/services/record/schemes/recod";

import { flexRender, type Table } from "@tanstack/react-table";

interface BodyProps {
  table: Table<RecordResponseSchema>;
}

const Body = ({ table }: BodyProps) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="hover:bg-gray-50 border-b last:border-b-0">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="border-r p-2 last:border-r-0">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export { Body };
