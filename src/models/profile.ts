export type Address = {
  city: string;
  line1: string;
  state: string;
  country: string;
  postal_code: string;
};

export type Profile = {
  id: string;
  account: string;
  address: Address;
  birth_date: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  picture_url: string;
  employment_status: string;
  employment_type: string;
  job_title: string;
  ssn: string;
  platform_user_id: string;
  hire_dates: string[];
  terminations: string[];
  marital_status: string;
  gender: string;
  employer: string;
  metadata: any;
  created_at: string;
  updated_at: string;
  employerC?: string;
};
