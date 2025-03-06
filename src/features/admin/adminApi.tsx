import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    getPlatformStats: builder.query({
      query: (token) => ({
        url: "/admins/platform_stats",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUsers: builder.query({
      query: (token) => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getTransactions: builder.query({
      query: (token) => ({
        url: "/transactions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getLoans: builder.query({
      query: (token) => ({
        url: "/loans",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getRepayments: builder.query({
      query: (token) => ({
        url: "/repayments",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getLoanDistribution: builder.query({
      query: (token) => ({
        url: "/admins/loan_distributions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPlatformStatsQuery,
  useGetLoansQuery,
  useGetUsersQuery,
  useGetRepaymentsQuery,
  useGetTransactionsQuery,
  useGetLoanDistributionQuery
} = adminApi;
