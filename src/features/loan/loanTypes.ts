export interface Loan {
  id: number;
  borrower_id: number;
  lender_id: number;
  amount: number;
  interest: number;
  purpose: string;
  repayment_till: string;
  expected_return: number;
  status: string;
  total_return: number;
  platform_fee: number;
}

export interface LoanState {
  borrowedLoans: Loan[];
  lendedLoans: Loan[];
  allLoans: Loan[];
  loan: Loan | null;
}
