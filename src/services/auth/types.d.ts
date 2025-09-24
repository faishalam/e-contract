export interface TLoginResponse {
  tokens: Tokens;
  user: User;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  esign_id: string;
  esign_status_id: string;
  full_name: string;
  id: string;
  register_date: string;
  role: string;
  username: string;
}
