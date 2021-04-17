export interface PatientInterface {
  keywords: string[];
  firstname: string;
  lastname: string;
  dob_year: number;
  dob_month: number;
  dob_date: number;
  gender: 'male' | 'female';
  gurardian_firstname: string;
  gurardian_lastname: string;
  gurardian_nic: string;
  gurardian_mobile: number;
  gurardian_fixed: number;
  gurardian_addr_house: string;
  gurardian_addr_street: string;
  gurardian_addr_city: string;
}
