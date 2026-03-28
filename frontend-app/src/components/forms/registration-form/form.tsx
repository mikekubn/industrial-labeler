"use client";

import type { RegistrationFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import { EmailInput } from "./inputs/email";
import { NameInput } from "./inputs/name";
import { PasswordInput } from "./inputs/password";
import { PasswordConfirmationInput } from "./inputs/password-confirmation";
import { useRegistrationFormValidation } from "./validation";

const RegistrationFormInner = () => {
  const router = useRouter();
  const validation = useRegistrationFormValidation();
  const methods = useForm<RegistrationFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (value: RegistrationFormSchema) => {
    await authClient.signUp.email({
      name: value.name,
      email: value.email,
      password: value.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        credentials: "include",
        onSuccess: () => {
          toast.success("Registrace proběhla úspěšně");
          reset();
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error(error.error?.message);
        }
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form-rhf-registration"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-80"
      >
        <NameInput />
        <EmailInput />
        <PasswordInput />
        <PasswordConfirmationInput />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
        >
          {isSubmitting ? "Registrace..." : "Registrovat se"}
        </Button>
      </form>
    </FormProvider>
  );
};

const RegistrationForm = () => {
  return (
    <Suspense fallback={null}>
      <RegistrationFormInner />
    </Suspense>
  );
};

export { RegistrationForm };
