export type TResponseType<T> = {
  status: string;
  code: number;
  message: string;
  data: T;
};
type TExpressError = {
  location?: string;
  msg: string;
  path?: string;
  type?: string;
  value?: string;
  message?: string;
};
export type NetworkAPIError = { errors: TExpressError[]; message?: string };
