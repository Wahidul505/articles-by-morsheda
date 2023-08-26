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
        headers: { email: process.env.EMAIL, password: process.env.PASSWORD },
      }),
      invalidatesTags: ["contents"],
    }),
    createContent: builder.mutation({
      query: (payload) => ({
        url: "/",
        method: "POST",
        body: payload,
        headers: { email: process.env.EMAIL, password: process.env.PASSWORD },
      }),
      invalidatesTags: ["contents"],
    }),
    editContent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: payload,
        headers: { email: process.env.EMAIL, password: process.env.PASSWORD },
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
  useEditContentMutation,
} = contentApi;
