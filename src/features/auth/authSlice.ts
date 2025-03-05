// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { LoginResponse, SignupResponse, User } from "./authTypes";

// interface AuthState {
//   user: User | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action: PayloadAction<LoginResponse>) => {
//       state.token = action.payload.token;
//     },
//     setCredetials: (state, action: PayloadAction<SignupResponse>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//   },
// });

// export const {setToken, setCredetials } = authSlice.actions;
// export const authReducer = authSlice.reducer;
