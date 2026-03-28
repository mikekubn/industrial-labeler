import { CreateMaterialForm, DeleteMaterialForm, GetAllMaterialsForm } from "../forms/materials";

const MaterialsManagement = () => {
  return (
    <div className="flex flex-col gap-20">
      <CreateMaterialForm />
      <div className="w-full h-0.5 bg-[#e5e7eb]" />
      <GetAllMaterialsForm />
      <div className="w-full h-0.5 bg-[#e5e7eb]" />
      <DeleteMaterialForm />
    </div>
  );
};

export { MaterialsManagement };
