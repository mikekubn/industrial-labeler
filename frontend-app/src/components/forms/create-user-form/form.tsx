"use client";

import type { CreateUserFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import { EmailInput } from "./inputs/email";
import { NameInput } from "./inputs/name";
import { PasswordInput } from "./inputs/password";
import { SelectInput } from "./inputs/select";
import { useCreateUserFormValidation } from "./validation";

const CreateUserFormInner = () => {
  const validation = useCreateUserFormValidation();
  const methods = useForm<CreateUserFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "user"
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (values: CreateUserFormSchema) => {
    await authClient.admin.createUser({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Používateľ úspešne vytvorený");
          methods.reset();
        },
        onError: () => {
          toast.error("Chyba pri vytváraní používateľa");
        }
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form-rhf-create-user"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-80"
      >
        {" "}
        <EmailInput />
        <NameInput />
        <PasswordInput />
        <SelectInput />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
        >
          {isSubmitting ? "Vytváření..." : "Vytvoriť používateľa"}
        </Button>
      </form>
    </FormProvider>
  );
};

const CreateUserForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateUserFormInner />
    </Suspense>
  );
};

export { CreateUserForm };
