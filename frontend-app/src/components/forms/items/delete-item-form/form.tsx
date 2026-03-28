"use client";

import type { DeleteItemFormSchema } from "./schema";

import { Suspense, useEffect, useEffectEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getItemService } from "@/services/item/service";

import { toast } from "sonner";
import { ItemIdInput } from "./inputs/item-id";
import { useDeleteItemFormValidation } from "./validation";

const DeleteItemFormInner = () => {
  const itemService = getItemService();
  const queryClient = useQueryClient();
  const validation = useDeleteItemFormValidation();
  const methods = useForm<DeleteItemFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      itemId: ""
    }
  });

  const itemId = useWatch({
    control: methods.control,
    name: "itemId"
  });

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["item", "delete", itemId],
    queryFn: () => itemService.deleteItemById({ id: itemId }),
    enabled: false
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    await refetch();
  };

  const onFormSubmit = useEffectEvent(() => {
    toast.success("Položka byla úspěšně smazána");
    queryClient.invalidateQueries({
      queryKey: ["items", "all"]
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
          <ItemIdInput />
          <Button
            type="submit"
            disabled={isFetching}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isFetching ? "Mažu..." : "Smazat položku"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<DeleteItemFormSchema>
        data={data as DeleteItemFormSchema | null}
        error={error as DeleteItemFormSchema | null}
      />
    </div>
  );
};

const DeleteItemForm = () => {
  return (
    <Suspense fallback={null}>
      <DeleteItemFormInner />
    </Suspense>
  );
};

export { DeleteItemForm };
