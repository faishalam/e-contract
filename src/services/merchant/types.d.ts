export type TMerchantList = {
  id: string;
  user_id: string;
  company_name: string;
  brand_name: string;
  npwp: string;
  nib: string;
  industry: string;
  company_size: string;
  status: string;
};

export type TMerchantStats = {
  total_merchants: number;
  active_merchants: number;
  pending_merchants: number;
  suspended_merchants: number;
  total_templates: number;
  active_templates: number;
};
