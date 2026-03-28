import type { RecordResponseSchema, RecordsResponseSchema } from "@/services/record/schemes/recod";

import { useEffect, useMemo } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  type PaginationState,
  type Table as TableType,
  type Updater,
  useReactTable,
  type VisibilityState
} from "@tanstack/react-table";

import { Body } from "./body";
import { Header } from "./header";
import { Pagination } from "./pagination";
import { EditableQuantityCell } from "./quantity-cell";
import { Wrapper } from "./wrapper";

interface TableProps {
  payload: RecordsResponseSchema;
  pagination: PaginationState;
  onPaginationChange: (pagination: Updater<PaginationState>) => void;
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (updater: Updater<VisibilityState>) => void;
  onTable?: (table: TableType<RecordResponseSchema>) => void;
}

const Table = ({
  payload,
  pagination,
  onPaginationChange,
  columnVisibility,
  onColumnVisibilityChange,
  onTable
}: TableProps) => {
  const columnHelper = createColumnHelper<RecordResponseSchema>();

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor("id", {
        header: "ID",
        size: 400,
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor("item.name", {
        header: "Položka",
        cell: (info) => <div className="text-center">{info.getValue()}</div>
      })
    ];

    if (!payload?.data) return baseColumns;

    const uniqueMaterials = Array.from(new Set(payload.data.map((row) => row.material.name))).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );

    const materialColumns = uniqueMaterials.map((materialName, index) => {
      const match = materialName.match(/_(\d+)$/i);
      const titleSuffix = match ? match[1] : String(index + 1);

      return columnHelper.accessor("material.name", {
        id: `material_${index}_${titleSuffix}`,
        header: `Materiál ${titleSuffix}`,
        cell: (info) => <div className="text-center">{info.getValue() === materialName ? "TRUE" : "FALSE"}</div>
      });
    });

    const maxQuantities = payload.data.reduce((acc, curr) => Math.max(acc, curr.quantities.length), 0);

    const quantityColumns = Array.from({ length: maxQuantities }).flatMap((_, index) => {
      return [
        columnHelper.accessor((row) => row.quantities[index]?.input, {
          id: `quantities_${index}_input`,
          size: 300,
          header: `${index + 1}. Vážení Vstup / Kg`,
          cell: (info) => {
            const quantity = info.row.original.quantities[index];

            return (
              <EditableQuantityCell
                initialValue={quantity?.input ?? 0}
                quantityId={quantity?.id}
                recordId={info.row.original.id}
                quantityField="input"
                quantity={quantity}
              />
            );
          }
        }),
        columnHelper.accessor((row) => row.quantities[index]?.output, {
          id: `quantities_${index}_output`,
          size: 300,
          header: `${index + 1}. Vážení Výstup / Kg`,
          cell: (info) => {
            const quantity = info.row.original.quantities[index];

            return (
              <EditableQuantityCell
                initialValue={quantity?.output ?? 0}
                quantityId={quantity?.id}
                recordId={info.row.original.id}
                quantityField="output"
                quantity={quantity}
              />
            );
          }
        }),
        columnHelper.accessor((row) => row.quantities[index]?.isMarked, {
          id: `quantities_${index}_isMarked`,
          size: 200,
          header: `${index + 1}. Označena`,
          cell: (info) => <div className="text-center">{info.getValue() ? "✅" : "❌"}</div>
        })
      ];
    });

    return [...baseColumns, ...materialColumns, ...quantityColumns];
  }, [payload, columnHelper]);

  const tableData = useMemo(() => payload.data ?? [], [payload]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: payload?.totalPages ?? 0,
    state: {
      columnVisibility,
      pagination
    },
    onPaginationChange: onPaginationChange,
    onColumnVisibilityChange: onColumnVisibilityChange,
    columnResizeMode: "onChange"
  });

  useEffect(() => {
    if (onTable) {
      onTable(table);
    }
  }, [onTable, table]);

  return (
    <>
      <Wrapper>
        <table className="border-collapse w-full min-w-max">
          <>
            <Header table={table} />
            <Body table={table} />
          </>
        </table>
      </Wrapper>
      <Pagination table={table} />
    </>
  );
};

export { Table };
