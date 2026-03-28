import { CreateRecordForm, DeleteRecordForm, GetRecordForm } from "@/components/forms/records";

const RecordsManagement = () => (
  <div className="flex flex-col gap-20">
    <CreateRecordForm />
    <div className="w-full h-0.5 bg-[#e5e7eb]" />
    <GetRecordForm />
    <div className="w-full h-0.5 bg-[#e5e7eb]" />
    <DeleteRecordForm />
  </div>
);

export { RecordsManagement };
