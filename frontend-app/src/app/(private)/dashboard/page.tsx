"use client";

import type { PaginationState, VisibilityState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import { useEffect, useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ExportButton from "@/components/export-button";
import { Loading, NoRecords, Table } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getRecordService } from "@/services/record/service";

import { format, getUnixTime, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
  const recordService = getRecordService();

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: new Date()
  });
  const [marked, setMarked] = useState(false);

  const fromUnixTime = String(getUnixTime(String(date?.from)));
  const toUnixTime = String(getUnixTime(String(date?.to)));

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["records", pagination.pageIndex, pagination.pageSize, marked, fromUnixTime, toUnixTime],
    queryFn: () =>
      recordService.getAllRecords({
        from: fromUnixTime,
        to: toUnixTime,
        isMarked: marked,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize
      }),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-between items-center h-10 mb-2 gap-4">
        <div className="flex flex-row flex-wrap items-center h-10 mb-2 gap-4">
          <h1 className="text-xl font-bold">Přehled záznamů</h1>
          <FieldGroup className="mx-auto w-45">
            <Field orientation="horizontal">
              <Checkbox
                className="cursor-pointer"
                checked={columnVisibility.id ?? false}
                onCheckedChange={(checked) => setColumnVisibility((prev) => ({ ...prev, id: !!checked }))}
              />
              <FieldLabel htmlFor="terms-checkbox-basic">Zobrazit ID záznamů</FieldLabel>
            </Field>
          </FieldGroup>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal">
                <CalendarIcon />
                {date?.from && date?.to ? (
                  `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                ) : (
                  <span>Vyberte rozsah dat</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
            </PopoverContent>
          </Popover>
          <FieldGroup className="mx-auto w-60">
            <Field orientation="horizontal">
              <Checkbox className="cursor-pointer" checked={marked} onCheckedChange={() => setMarked(!marked)} />
              <FieldLabel htmlFor="marked-checkbox">Zobrazit jen označené váhy</FieldLabel>
            </Field>
          </FieldGroup>
        </div>
        <div className="flex flex-row flex-wrap items-center h-10 mb-2 gap-4">
          <Button onClick={() => refetch()} variant="outline" className="cursor-pointer">
            Znovu načíst data
          </Button>
          <ExportButton from={fromUnixTime} to={toUnixTime} isMarked={marked} limit={pagination.pageSize} />
        </div>
      </div>
      {isLoading && <Loading />}
      {!data?.data && <NoRecords />}
      {data?.data && (
        <Table
          payload={data}
          pagination={pagination}
          onPaginationChange={setPagination}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      )}
    </>
  );
};

export default DashboardPage;
