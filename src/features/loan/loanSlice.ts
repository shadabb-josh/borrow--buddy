import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loan, LoanState } from "./loanTypes";

const initialState: LoanState = {
  borrowedLoans: [],
  lendedLoans: [],
  allLoans: [],
  loan: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setBorrowedLoans: (state, action: PayloadAction<Loan[]>) => {
      state.borrowedLoans = action.payload;
    },
    setLendedLoans: (state, action: PayloadAction<Loan[]>) => {
      state.lendedLoans = action.payload; 
    },
    setAllLoans: (state, action: PayloadAction<Loan[]>) => {
      state.allLoans = action.payload;
    },
    setLoan: (state, action: PayloadAction<Loan>) => {
      state.loan = action.payload;
    },
    clearLoans: (state) => {
      state.borrowedLoans = [];
      state.lendedLoans = [];
    },
  },
});

export const {
  setBorrowedLoans,
  setLendedLoans,
  setAllLoans,
  setLoan,
  clearLoans,
} = loanSlice.actions;
export const loanReducer = loanSlice.reducer;
