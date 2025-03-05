import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userApi } from "../features/user/userApi";
import { userReducer } from "../features/user/userSlice";
import { loanReducer } from "../features/loan/loanSlice";
import { loanApi } from "../features/loan/loanApi";
// import { authReducer } from "../features/auth/authSlice";    

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [loanApi.reducerPath]: loanApi.reducer,
    user: userReducer,
    loan: loanReducer
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, loanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
