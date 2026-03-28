"use client";

import type { DeleteMaterialFormSchema } from "./schema";

import { Suspense, useEffect, useEffectEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getMaterialService } from "@/services/material/service";

import { toast } from "sonner";
import { MaterialIdInput } from "./inputs/material-id";
import { useDeleteMaterialFormValidation } from "./validation";

const DeleteMaterialFormInner = () => {
  const materialService = getMaterialService();
  const queryClient = useQueryClient();
  const validation = useDeleteMaterialFormValidation();
  const methods = useForm<DeleteMaterialFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      materialId: ""
    }
  });

  const materialId = useWatch({
    control: methods.control,
    name: "materialId"
  });

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["material", "delete", materialId],
    queryFn: () => materialService.deleteMaterialById({ id: materialId }),
    enabled: false
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    await refetch();
  };

  const onFormSubmit = useEffectEvent(() => {
    toast.success("Materiál byl úspěšně smazán");
    queryClient.invalidateQueries({
      queryKey: ["materials", "all"]
    });
    methods.reset();
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      onFormSubmit();
    }
  }, [data]);

  return (
    <div className="grid grid-cols-2 gap-10 items-start">
      <FormProvider {...methods}>
        <form
          id="form-rhf-create-record"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-80"
        >
          <MaterialIdInput />
          <Button
            type="submit"
            disabled={isFetching}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isFetching ? "Mažu..." : "Smazat materiál"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<DeleteMaterialFormSchema>
        data={data as DeleteMaterialFormSchema | null}
        error={error as DeleteMaterialFormSchema | null}
      />
    </div>
  );
};

const DeleteMaterialForm = () => {
  return (
    <Suspense fallback={null}>
      <DeleteMaterialFormInner />
    </Suspense>
  );
};

export { DeleteMaterialForm };
