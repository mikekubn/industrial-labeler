"use client";

import type { CreateItemFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getItemService } from "@/services/item/service";

import { toast } from "sonner";
import { ItemNameInput } from "./inputs/item-name";
import { useCreateItemFormValidation } from "./validation";

const CreateItemFormInner = () => {
  const itemService = getItemService();
  const queryClient = useQueryClient();
  const validation = useCreateItemFormValidation();
  const methods = useForm<CreateItemFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      name: ""
    }
  });

  const {
    data,
    error,
    mutateAsync: createItem,
    isPending: isCreatingItem
  } = useMutation({
    mutationFn: (payload: CreateItemFormSchema) => itemService.createItem(payload),
    onSuccess: () => {
      toast.success("Položka byla úspěšně vytvořena");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["items", "all"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření položky");
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (value: CreateItemFormSchema) => {
    const sanityItemName = value.name.toUpperCase().replaceAll(" ", "_");
    createItem({ name: sanityItemName });
  };

  return (
    <div className="grid grid-cols-2 gap-10 items-start">
      <FormProvider {...methods}>
        <form
          id="form-rhf-create-record"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-80"
        >
          <ItemNameInput />
          <Button
            type="submit"
            disabled={isCreatingItem}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isCreatingItem ? "Ukládám..." : "Vytvořit položku"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<CreateItemFormSchema>
        data={data as CreateItemFormSchema | null}
        error={error as CreateItemFormSchema | null}
      />
    </div>
  );
};

const CreateItemForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateItemFormInner />
    </Suspense>
  );
};

export { CreateItemForm };
