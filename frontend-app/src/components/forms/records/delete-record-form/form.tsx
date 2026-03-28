"use client";

import type { DeleteRecordFormSchema } from "./schema";

import { Suspense, useEffect, useEffectEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getRecordService } from "@/services/record/service";

import { toast } from "sonner";
import { RecordIdInput } from "./inputs/record-id";
import { useDeleteRecordFormValidation } from "./validation";

const DeleteRecordFormInner = () => {
  const recordService = getRecordService();
  const validation = useDeleteRecordFormValidation();
  const methods = useForm<DeleteRecordFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      recordId: ""
    }
  });

  const recordId = useWatch({
    control: methods.control,
    name: "recordId"
  });

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["record", "delete", recordId],
    queryFn: () => recordService.deleteRecord({ id: recordId }),
    enabled: false
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    await refetch();
  };

  const onFormSubmit = useEffectEvent(() => {
    toast.success("Záznam byl úspěšně smazán");
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
          id="form-rhf-delete-record"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-80"
        >
          <RecordIdInput />
          <Button
            type="submit"
            disabled={isFetching}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            size="lg"
          >
            {isFetching ? "Mažu..." : "Smazat záznam"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<DeleteRecordFormSchema>
        data={data as DeleteRecordFormSchema | null}
        error={error as DeleteRecordFormSchema | null}
      />
    </div>
  );
};

const DeleteRecordForm = () => {
  return (
    <Suspense fallback={null}>
      <DeleteRecordFormInner />
    </Suspense>
  );
};

export { DeleteRecordForm };
