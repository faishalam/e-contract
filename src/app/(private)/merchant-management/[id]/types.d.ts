export type TOption = {
  value: string;
  label: string;
};

export type TMerchantForm = {
  company_name: string;
  brand_name: string | null;
  npwm: number | null;
  nib: number | null;
  industry: TOption | null;
  company_size: TOption | null;
  company_address: TOption | null;
  city: string | null;
  province: string | null;
  postcode: number | null;

  company_email: string | null;
  phone_number: string;
  website: string | null;
  fax: number | null;

  pic_name: string;
  pic_email: string;
  pic_department: string | null;
  pic_jabatan: string;
  pic_phone_number_office: string | null;
  pic_phone_number: string;
};
