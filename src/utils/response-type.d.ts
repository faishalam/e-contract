export type TResponseType<T> = {
  status: string;
  code: number;
  message: string;
  data: T;
  meta: TMeta;
};

export type TMeta = {
  has_next: boolean;
  has_previous: boolean;
  limit: number;
  page: number;
  total: number;
  total_pages: number;
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
