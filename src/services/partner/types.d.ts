export type TPartnerList = {
  id?: string;
  merchant_id?: string;
  name: string;
  type: string;
  contact_name: string;
  position: string;
  email: string;
  phone_number: string;
  address: string;
  status: string;
};

export type TPartnerDetail = {
  id: string;
  merchant_id: string;
  name: string;
  type: string;
  contact_name: string;
  position: string;
  email: string;
  phone_number: string;
  address: string;
  status: string;
  merchant: {
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
};
