import { retry } from "@reduxjs/toolkit/query/react";
import { IUser, LoginRequest } from "../../features/login/authSlice";
import { api } from "./api";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "start",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        },
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
