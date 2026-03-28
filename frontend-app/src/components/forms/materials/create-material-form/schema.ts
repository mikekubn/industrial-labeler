import { z } from "zod/v4";

const CREATE_MATERIAL_FORM_SCHEMA = z.object({
  name: z.string()
});

type CreateMaterialFormSchema = z.infer<typeof CREATE_MATERIAL_FORM_SCHEMA>;

export { CREATE_MATERIAL_FORM_SCHEMA, type CreateMaterialFormSchema };
