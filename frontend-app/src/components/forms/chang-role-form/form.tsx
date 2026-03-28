"use client";

import type { ChangeRoleFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getInternalService } from "@/services/internal/service";

import { toast } from "sonner";
import { EmailInput } from "./inputs/email";
import { SelectInput } from "./inputs/select";
import { useChangeRoleFormValidation } from "./validation";

const ChangeRoleFormInner = () => {
  const internalService = getInternalService();
  const validation = useChangeRoleFormValidation();
  const methods = useForm<ChangeRoleFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: "",
      role: "user"
    }
  });

  const { mutateAsync: updateRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: (payload: ChangeRoleFormSchema) => internalService.updateRole(payload),
    onSuccess: () => {
      toast.success("Role byla úspěšně změněna");
      methods.reset();
    },
    onError: () => {
      toast.error("Chyba při změně role");
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = (data: ChangeRoleFormSchema) => {
    updateRole(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form-rhf-change-role"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-80"
      >
        <EmailInput />
        <SelectInput />
        <Button
          type="submit"
          disabled={isUpdatingRole || isSubmitting}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
        >
          {isUpdatingRole || isSubmitting ? "Změna role..." : "Změnit roli"}
        </Button>
      </form>
    </FormProvider>
  );
};

const ChangeRoleForm = () => {
  return (
    <Suspense fallback={null}>
      <ChangeRoleFormInner />
    </Suspense>
  );
};

export { ChangeRoleForm };
