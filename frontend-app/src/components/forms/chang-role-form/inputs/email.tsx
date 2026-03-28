import type { ChangeRoleFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const EmailInput = () => {
  const form = useFormContext<ChangeRoleFormSchema>();

  return (
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            Email <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...field} id={field.name} type="email" className="w-full" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { EmailInput };
