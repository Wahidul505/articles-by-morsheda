import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://articles-by-morsheda-server.vercel.app/api/v1/content",
    credentials: "same-origin",
  }),
  tagTypes: ["contents"],
  endpoints: () => ({}),
});
