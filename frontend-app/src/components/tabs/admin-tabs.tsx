import { ChangeRoleForm } from "../forms/chang-role-form";
import { ChangePasswordForm } from "../forms/change-password-form";
import { CreateUserForm } from "../forms/create-user-form";
import { ItemsManagement } from "../items";
import { MaterialsManagement } from "../materials";
import { RecordsManagement } from "../records";
import { UsersManagement } from "../users";

const items = [
  {
    value: "account",
    label: "Vytvořit účet",
    children: <CreateUserForm />
  },
  {
    value: "password",
    label: "Změnit heslo",
    children: <ChangePasswordForm />
  },
  {
    value: "role",
    label: "Změnit roli",
    children: <ChangeRoleForm />
  },
  {
    value: "users",
    label: "Správa uživatelů",
    children: <UsersManagement />
  },
  {
    value: "records",
    label: "Správa záznamů",
    children: <RecordsManagement />
  },
  {
    value: "materials",
    label: "Správa materiálů",
    children: <MaterialsManagement />
  },
  {
    value: "items",
    label: "Správa položek",
    children: <ItemsManagement />
  }
];

export { items };
