"use client";

import type { ItemListResponseSchema } from "@/services/item/schemes/item";

import { Suspense, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getItemService } from "@/services/item/service";

import { toast } from "sonner";

const GetAllItemsFormInner = () => {
  const materialService = getItemService();

  const { data, error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["items", "all"],
    queryFn: () => materialService.getAllItems()
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="grid grid-cols-2 gap-10 items-start">
      <div className="flex flex-col items-center justify-center w-80">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
          onClick={() => refetch()}
        >
          {isLoading ? "Stahuji..." : "Načíst položky"}
        </Button>
      </div>
      <JsonViewer<ItemListResponseSchema>
        data={data as ItemListResponseSchema | null}
        error={error as ItemListResponseSchema | null}
      />
    </div>
  );
};

const GetAllItemsForm = () => {
  return (
    <Suspense fallback={null}>
      <GetAllItemsFormInner />
    </Suspense>
  );
};

export { GetAllItemsForm };
