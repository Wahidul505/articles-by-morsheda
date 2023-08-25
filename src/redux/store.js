import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "@/redux/features/content/contentSlice";
import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
