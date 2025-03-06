export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number
}

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  pan_number: string | null;
  adhaar_number: string | null;
  status: string | null;
}

export interface SignupRequest {
    email: string,
    password : string
}

export interface SignupResponse{
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  pan_number: string | null;
  adhaar_number: string | null;
  status: string | null;
}
