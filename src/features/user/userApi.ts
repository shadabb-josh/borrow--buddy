import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TransactionResponse,
  UserDetailsResponse,
  UserDetailsSubmitData,
  UserResponse,
} from "./userTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000" }),
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    update: builder.mutation<
      UserDetailsResponse,
      { userId: string; data: UserDetailsSubmitData }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: ({ id, token, body }) => ({
        url: `/users/${id}/change_password`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),

    getAllTransaction: builder.query<
      TransactionResponse,
      { id: number; token: string }
    >({
      query: ({ id, token }) => ({
        url: `users/get_all_transactions`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { id: id },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateMutation,
  useGetAllTransactionQuery,
  useChangePasswordMutation,
} = userApi;
