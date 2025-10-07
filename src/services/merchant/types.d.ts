export type TMerchantDetail = {
  id: string;
  user_id: string;
  company_name: string;
  brand_name: string;
  npwp: string;
  nib: string;
  industry: string;
  company_size: string;
  status: string;
  profile: TProfileMerchant;
  pics: TProfilePIC[];
};

export type TProfilePIC = {
  name: string;
  email: string;
  phone: string;
  office_phone: string;
  position: string;
  department: string;
};

export type TProfileMerchant = {
  address: string;
  city: string;
  province: string;
  postal_code: string;
  website: string;
  company_email: string;
  company_phone: string;
  fax: string;
  joined_date: string;
  renewal_date: string;
  plan: string;
  price: number;
};

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

// export type TMerchantProfile = {

// }

export type TMerchantStats = {
  total_merchants: number;
  active_merchants: number;
  pending_merchants: number;
  suspended_merchants: number;
  total_templates: number;
  active_templates: number;
};
