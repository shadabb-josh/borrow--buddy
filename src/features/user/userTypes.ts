export interface UserDetailsSubmitData {
  first_name: string;
  last_name: string;
  pan_number: string;
  adhaar_number: string;
  account_number: string;
  ifsc: string;
  pin: string;
  balance: number;
  status: string;
}

export interface UserDetailsFormData {
  firstName: string;
  lastName: string;
  pan: string;
  panConfirm: string;
  aadhaar: string;
  aadhaarConfirm: string;
  accountNumber: string;
  accountNumberConfirm: string;
  ifsc: string;
  ifscConfirm: string;
  pin: string;
  pinConfirm: string;
}

export interface UserDetailsResponse{
  firstName: string;
  lastName: string;
  pan: string;
  aadhaar: string;
  accountNumber: string;
  ifsc: string;
  pin: string;
  status: string;
}

export interface UserResponse{
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  pan_number: string;
  adhaar_number: string;
  status: string;
}

export interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  pan_number: string | null;
  adhaar_number: string | null;
  status: string | null;
  transactions: TransactionResponse[] | [];
}

export interface TransactionResponse {
  id: number;
  user_id: number;
  loan_id: number;
  amount: number;
  transaction_type: "investment" | "repayment" | "withdrawal";
  created_at: string;
  updated_at: string; 
}
