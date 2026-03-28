"use client";

import type { GetRecordFormSchema } from "./schema";

import { Suspense, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { getRecordService } from "@/services/record/service";

import { toast } from "sonner";
import { RecordIdInput } from "./inputs/record-id";
import { useGetRecordFormValidation } from "./validation";

const GetRecordFormInner = () => {
  const recordService = getRecordService();
  const validation = useGetRecordFormValidation();
  const methods = useForm<GetRecordFormSchema>({
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
    queryKey: ["record", "get", recordId],
    queryFn: () => recordService.getRecordById({ id: recordId }),
    enabled: false
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    await refetch();
  };

  useEffect(() => {
    if (data) {
      toast.success("Záznam byl úspěšně načten");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="grid grid-cols-2 gap-10 items-start">
      <FormProvider {...methods}>
        <form
          id="form-rhf-get-record"
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
            {isFetching ? "Načítám..." : "Načíst záznam"}
          </Button>
        </form>
      </FormProvider>
      <JsonViewer<GetRecordFormSchema>
        data={data as GetRecordFormSchema | null}
        error={error as GetRecordFormSchema | null}
      />
    </div>
  );
};

const GetRecordForm = () => {
  return (
    <Suspense fallback={null}>
      <GetRecordFormInner />
    </Suspense>
  );
};

export { GetRecordForm };
