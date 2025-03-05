import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionResponse, UserState } from "./userTypes";

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  pan_number: null,
  adhaar_number: null,
  status: null,
  transactions: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { setUser, clearUser, setTransactions } = userSlice.actions;
export const userReducer = userSlice.reducer;
