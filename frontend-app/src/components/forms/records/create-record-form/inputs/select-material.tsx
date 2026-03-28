import type { CreateRecordFormSchema } from "../schema";

import { Controller, useFormContext } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMaterialService } from "@/services/material/service";

const SelectMaterialInput = () => {
  const materialService = getMaterialService();
  const form = useFormContext<CreateRecordFormSchema>();

  const { data } = useQuery({
    queryKey: ["materials"],
    queryFn: () => materialService.getAllMaterials()
  });

  return (
    <Controller
      name="materialId"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-26">
          <FieldLabel htmlFor={field.name}>
            Materiál <span className="text-destructive">*</span>
          </FieldLabel>
          <Select {...field} aria-invalid={fieldState.invalid} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Vyberte materiál" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name}
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

export { SelectMaterialInput };
