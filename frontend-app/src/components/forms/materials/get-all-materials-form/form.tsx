"use client";

import type { MaterialListResponseSchema } from "@/services/material/schemes/material";

import { Suspense, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getMaterialService } from "@/services/material/service";

import { toast } from "sonner";

const GetAllMaterialsFormInner = () => {
  const materialService = getMaterialService();

  const { data, error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["materials", "all"],
    queryFn: () => materialService.getAllMaterials()
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
          {isLoading ? "Stahuji..." : "Načíst materiály"}
        </Button>
      </div>
      <JsonViewer<MaterialListResponseSchema>
        data={data as MaterialListResponseSchema | null}
        error={error as MaterialListResponseSchema | null}
      />
    </div>
  );
};

const GetAllMaterialsForm = () => {
  return (
    <Suspense fallback={null}>
      <GetAllMaterialsFormInner />
    </Suspense>
  );
};

export { GetAllMaterialsForm };
