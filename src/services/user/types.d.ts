export type TUserList = {
  users: TUser[];
};

export type TUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  is_active: boolean;
  role: string;
};

export type TUserForm = {
  email: string;
  username: string;
  name: string;
  phone: string;
  password?: string;
  is_active?: boolean;
};
