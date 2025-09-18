export type TResponseType<T> = {
  data: T;
  status: string;
  success: boolean;
  message: string;
  status?: number;
};
type TExpressError = {
  location?: string;
  msg: string;
  path?: string;
  type?: string;
  value?: string;
};
export type NetworkAPIError = { errors: TExpressError[] };
