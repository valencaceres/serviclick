import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../utils/config";

export const productApi = createApi({
  reducerPath: "products",

  baseQuery: fetchBaseQuery({
    baseUrl: `${config.server}/api/`,
    prepareHeaders: (headers) => {
      headers.set("id", config.apiKey);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "/listProducts",
    }),

    getById: builder.query({
      query: (todoId) => `/getProduct/${todoId}`,
    }),
  }),
});

export const { useGetAllQuery, useGetByIdQuery, useLazyGetByIdQuery } =
  productApi;
