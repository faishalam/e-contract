export type TLoginResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TUser = {
  esign_id: string;
  esign_status_id: string;
  full_name: string;
  id: string;
  register_date: string;
  role: string;
  username: string;
};

export type TRoles = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type TUserProfile = {
  id: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  is_active: boolean;
  role: string;
  roles: TRoles[];
};

export type TVerifyUserToken = {
  valid: boolean;
};

export type TSendOtpResponse = {
  message: string;
  email: string;
};

export type TResetPasswordForm = {
  email: string;
  code: string;
  new_password: string;
  confirm_password: string;
};
