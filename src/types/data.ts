export interface UserState {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: number;
  date_of_birth: string;
  employment: any;
  address: any;
  credit_card: any;
  subscription: any;
  rating?: number | undefined;
}
