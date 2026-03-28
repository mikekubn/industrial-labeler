import type { CreateMaterialFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const MaterialNameInput = () => {
  const form = useFormContext<CreateMaterialFormSchema>();

  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            Název materiálu <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...field} id={field.name} type="text" className="w-full" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { MaterialNameInput };
