import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    getLoanById: builder.query({
      query: ({ id, token }) => ({
        url: `/loans/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getAllLoans: builder.query({
      query: (token) => ({
        url: "/loans",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getBorrowedLoans: builder.query({
      query: ({ id, token }) => ({
        url: "/users/get_all_borrowed_loans",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id },
      }),
    }),

    getLendedLoans: builder.query({
      query: ({ id, token }) => ({
        url: "/users/get_all_lended_loans",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id },
      }),
    }),

    doPayment: builder.mutation({
      query: ({ body, token }) => ({
        url: "/users/do_transaction",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),

    loanApplication: builder.mutation({
      query: ({ body, token }) => ({
        url: "/loans",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),

    updateLoanStatus: builder.mutation({
      query: ({ id ,body, token }) => ({
        url: `/loans/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),
  }),
});

export const {
  useGetBorrowedLoansQuery,
  useGetLendedLoansQuery,
  useGetAllLoansQuery,
  useGetLoanByIdQuery,
  useDoPaymentMutation,
  useLoanApplicationMutation,
  useUpdateLoanStatusMutation
} = loanApi;
