import { api } from "../../api/apiSlice";

const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLatestContents: builder.query({
      query: () => "/latest",
    }),
    getContentsByStatus: builder.query({
      query: (status) => `/status/${status}`,
      providesTags: ["contents"],
    }),
    updateContentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { status: status },
      }),
      invalidatesTags: ["contents"],
    }),
    createContent: builder.mutation({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["contents"],
    }),
  }),
});

export const {
  useGetLatestContentsQuery,
  useGetContentsByStatusQuery,
  useUpdateContentStatusMutation,
  useCreateContentMutation,
} = contentApi;
