export type TOption = {
  value: string;
  label: string;
};

export type TContractForm = {
  title: string;
  party1: OptionType | null;
  party2: OptionType | null;
  contractType: OptionType | null;
  contractValue: string;
  startDate: string;
  endDate: string;
  picInternal: OptionType | null;
  department: OptionType | null;
  template: string;
  description?: string;
  tags?: string;
};
