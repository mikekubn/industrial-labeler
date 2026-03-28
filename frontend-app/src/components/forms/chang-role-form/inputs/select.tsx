import type { ChangeRoleFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectInput = () => {
  const form = useFormContext<ChangeRoleFormSchema>();

  return (
    <Controller
      name="role"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            Role <span className="text-destructive">*</span>
          </FieldLabel>
          <Select {...field} aria-invalid={fieldState.invalid} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Vyberte roli" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="user">Uživatel</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { SelectInput };
