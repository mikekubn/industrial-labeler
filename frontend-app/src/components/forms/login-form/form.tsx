"use client";

import type { LoginFormSchema } from "./schema";

import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import { EmailInput } from "./inputs/email";
import { PasswordInput } from "./inputs/password";
import { useLoginFormValidation } from "./validation";

const LoginFormInner = () => {
  const router = useRouter();
  const validation = useLoginFormValidation();
  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(validation),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (value: LoginFormSchema) => {
    await authClient.signIn.email({
      email: value.email,
      password: value.password,
      callbackURL: "/dashboard",
      rememberMe: true,
      fetchOptions: {
        credentials: "include",
        onSuccess: () => {
          toast.success("Přihlášení proběhlo úspěšně");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message ?? "Přihlášení se nezdařilo");
        }
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form-rhf-login"
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
          {isSubmitting ? "Přihlášení..." : "Přihlásit se"}
        </Button>
      </form>
    </FormProvider>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
};

export { LoginForm };
