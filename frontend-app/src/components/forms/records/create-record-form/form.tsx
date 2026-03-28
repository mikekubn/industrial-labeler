"use client";

import type { CreateRecordFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getRecordService } from "@/services/record/service";

import { toast } from "sonner";
import { SelectItemInput } from "./inputs/select-item";
import { SelectMaterialInput } from "./inputs/select-material";
import { useCreateRecordFormValidation } from "./validation";

const CreateRecordFormInner = () => {
  const recordService = getRecordService();
  const queryClient = useQueryClient();
  const validation = useCreateRecordFormValidation();
  const methods = useForm<CreateRecordFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      itemId: "",
      materialId: ""
    }
  });

  const {
    data,
    error,
    mutateAsync: createRecord,
    isPending: isCreatingRecord
  } = useMutation({
    mutationFn: (payload: CreateRecordFormSchema) => recordService.createRecord(payload),
    onSuccess: () => {
      toast.success("Záznam byl úspěšně vytvořen");
      queryClient.invalidateQueries({ queryKey: ["records"] });
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při vytváření");
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (value: CreateRecordFormSchema) => {
    createRecord(value);
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
          <SelectItemInput />
          <SelectMaterialInput />
          <Button
            type="submit"
            disabled={isCreatingRecord}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isCreatingRecord ? "Ukládám..." : "Vytvořit záznam"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<CreateRecordFormSchema>
        data={data as CreateRecordFormSchema | null}
        error={error as CreateRecordFormSchema | null}
      />
    </div>
  );
};

const CreateRecordForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateRecordFormInner />
    </Suspense>
  );
};

export { CreateRecordForm };
