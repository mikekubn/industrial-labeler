"use client";

import type { CreateMaterialFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getMaterialService } from "@/services/material/service";

import { toast } from "sonner";
import { MaterialNameInput } from "./inputs/material-name";
import { useCreateMaterialFormValidation } from "./validation";

const CreateMaterialFormInner = () => {
  const materialService = getMaterialService();
  const queryClient = useQueryClient();
  const validation = useCreateMaterialFormValidation();
  const methods = useForm<CreateMaterialFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      name: ""
    }
  });

  const {
    data,
    error,
    mutateAsync: createMaterial,
    isPending: isCreatingMaterial
  } = useMutation({
    mutationFn: (payload: CreateMaterialFormSchema) => materialService.createMaterial(payload),
    onSuccess: () => {
      toast.success("Materiál byl úspěšně vytvořen");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({ queryKey: ["materials", "all"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření materiálu");
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (value: CreateMaterialFormSchema) => {
    const sanityMaterialName = value.name.toUpperCase().replaceAll(" ", "_");
    createMaterial({ name: sanityMaterialName });
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
          <MaterialNameInput />
          <Button
            type="submit"
            disabled={isCreatingMaterial}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isCreatingMaterial ? "Ukládám..." : "Vytvořit materiál"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<CreateMaterialFormSchema>
        data={data as CreateMaterialFormSchema | null}
        error={error as CreateMaterialFormSchema | null}
      />
    </div>
  );
};

const CreateMaterialForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateMaterialFormInner />
    </Suspense>
  );
};

export { CreateMaterialForm };
