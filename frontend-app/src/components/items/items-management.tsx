import { CreateItemForm, DeleteItemForm, GetAllItemsForm } from "../forms/items";

const ItemsManagement = () => (
  <div className="flex flex-col gap-20">
    <CreateItemForm />
    <div className="w-full h-0.5 bg-[#e5e7eb]" />
    <GetAllItemsForm />
    <div className="w-full h-0.5 bg-[#e5e7eb]" />
    <DeleteItemForm />
  </div>
);

export { ItemsManagement };
