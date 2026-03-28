"use client";

import type { ChangePasswordFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getInternalService } from "@/services/internal/service";

import { toast } from "sonner";
import { EmailInput } from "./inputs/email";
import { PasswordInput } from "./inputs/password";
import { useChangePasswordFormValidation } from "./validation";

const ChangePasswordFormInner = () => {
  const internalService = getInternalService();
  const validation = useChangePasswordFormValidation();
  const methods = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = methods;

  const email = useWatch({
    name: "email",
    control
  });

  const { data, refetch } = useQuery({
    queryKey: ["token", email],
    enabled: false,
    queryFn: () => internalService.getRequestPasswordToken({ email })
  });

  const onSubmit = async (values: ChangePasswordFormSchema) => {
    await authClient.requestPasswordReset({
      email: values.email,
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Email byl úspěšně odeslán");
          await refetch();
          const token = data?.token;

          if (token) {
            await authClient.resetPassword({
              token,
              newPassword: values.password,
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Heslo bylo úspěšně změněno");
                  methods.reset();
                },
                onError: () => {
                  toast.error("Chyba při změně hesla");
                }
              }
            });
          }
        },
        onError: () => {
          toast.error("Chyba při odesílání emailu");
        }
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form-rhf-change-password"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-80"
      >
        <EmailInput />
        <PasswordInput />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
        >
          {isSubmitting ? "Změna hesla..." : "Změnit heslo"}
        </Button>
      </form>
    </FormProvider>
  );
};

const ChangePasswordForm = () => {
  return (
    <Suspense fallback={null}>
      <ChangePasswordFormInner />
    </Suspense>
  );
};

export { ChangePasswordForm };
