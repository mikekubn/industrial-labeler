import type { ChangePasswordFormSchema } from "../schema";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleShowPassword = () => setIsPasswordVisible((prev) => !prev);
  const form = useFormContext<ChangePasswordFormSchema>();

  return (
    <Controller
      name="password"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-27">
          <FieldLabel htmlFor={field.name}>
            Heslo <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              {...field}
              id={field.name}
              type={isPasswordVisible ? "text" : "password"}
              className="w-full"
              aria-invalid={fieldState.invalid}
            />
            <InputGroupButton
              aria-label={isPasswordVisible ? "Skrýt heslo" : "Ukázat heslo"}
              title={isPasswordVisible ? "Skrýt heslo" : "Ukázat heslo"}
              className="cursor-pointer mr-1"
              size="icon-xs"
              onMouseEnter={() => {
                toggleShowPassword();
              }}
              onMouseLeave={() => {
                toggleShowPassword();
              }}
            >
              {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupButton>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { PasswordInput };
