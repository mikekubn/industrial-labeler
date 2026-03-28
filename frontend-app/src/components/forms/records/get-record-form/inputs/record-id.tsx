import type { GetRecordFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const RecordIdInput = () => {
  const form = useFormContext<GetRecordFormSchema>();

  return (
    <Controller
      name="recordId"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            ID záznamu <span className="text-destructive">*</span>
          </FieldLabel>
          <Input {...field} id={field.name} className="w-full" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { RecordIdInput };
