import type { CreateRecordFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getItemService } from "@/services/item/service";

const SelectItemInput = () => {
  const itemService = getItemService();
  const form = useFormContext<CreateRecordFormSchema>();

  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: () => itemService.getAllItems()
  });

  return (
    <Controller
      name="itemId"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            Položka <span className="text-destructive">*</span>
          </FieldLabel>
          <Select {...field} aria-invalid={fieldState.invalid} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Vyberte položku" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export { SelectItemInput };
