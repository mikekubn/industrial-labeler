import { z } from "zod/v4";

const DELETE_MATERIAL_FORM_SCHEMA = z.object({
  materialId: z.string()
});

type DeleteMaterialFormSchema = z.infer<typeof DELETE_MATERIAL_FORM_SCHEMA>;

export { DELETE_MATERIAL_FORM_SCHEMA, type DeleteMaterialFormSchema };
