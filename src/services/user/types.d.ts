export type TUserList = {
  id: string;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  role: string;
};

export type TUserForm = {
  email: string;
  name: string;
  phone: string;
  password?: string;
  is_active?: boolean;
};
