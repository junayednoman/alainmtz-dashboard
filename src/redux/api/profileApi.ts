import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetProfileQuery } = profileApi;