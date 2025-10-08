import { ColDef, ColGroupDef } from '@ag-grid-community/core';

export type TUser = {
  id: string;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  role: string;
};

export type TUserListCol = ColDef<TUser> | ColGroupDef<TUser>;

export type TUserForm = {
  email: string;
  name: string;
  phone: string;
  password?: string;
  is_active?: boolean;
};
