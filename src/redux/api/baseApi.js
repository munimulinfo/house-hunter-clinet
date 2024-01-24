import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://house-renter-client.vercel.app",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseapi",
  tagTypes: ["allhouse", "bookedHouse"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    userLogin: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    addHouse: builder.mutation({
      query: (houseData) => ({
        url: "/postHouse",
        method: "POST",
        body: houseData,
      }),
      invalidatesTags: ["allhouse"],
    }),
    editHouse: builder.mutation({
      query: (houseData) => ({
        url: `/editHouse/${houseData?.id}`,
        method: "PUT",
        body: houseData?.newData,
      }),
      invalidatesTags: ["allhouse"],
    }),
    deletHouse: builder.mutation({
      query: (id) => ({
        url: `/deletHouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allhouse"],
    }),
    deletBookedHouse: builder.mutation({
      query: (id) => ({
        url: `/dletBookedHouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookedHouse"],
    }),
    postBookedHouse: builder.mutation({
      query: (bookHouse) => ({
        url: `/bookedHouse`,
        method: "POST",
        body: bookHouse,
      }),
      invalidatesTags: ["bookedHouse"],
    }),
    allUser: builder.query({
      query: () => ({
        url: "/allUser",
        method: "GET",
      }),
    }),
    allOwnerHouse: builder.query({
      query: (id) => ({
        url: `/findIdByHOuse/${id}`,
        method: "GET",
      }),
      providesTags: ["allhouse"],
    }),

    getallHouse: builder.query({
      query: () => ({
        url: `/allOwnerHouse`,
        method: "GET",
      }),
      providesTags: ["allhouse"],
    }),

    getBookedHouse: builder.query({
      query: (email) => {
        console.log(email, "inside base api");
        return {
          url: `/getSingleBooked-house/${email}`,
          method: "GET",
          params: email,
        };
      },
      providesTags: ["bookedHouse"],
    }),

    getBookedHouseOwner: builder.query({
      query: (id) => {
        console.log(id, "inside base api");
        return {
          url: `/getBookedHousebyId/${id}`,
          method: "GET",
          params: id,
        };
      },
      providesTags: ["bookedHouse"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useAllUserQuery,
  useAddHouseMutation,
  useAllOwnerHouseQuery,
  useDeletHouseMutation,
  useEditHouseMutation,
  useGetallHouseQuery,
  usePostBookedHouseMutation,
  useDeletBookedHouseMutation,
  useGetBookedHouseQuery,
  useGetBookedHouseOwnerQuery,
} = baseApi;
