import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), 
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/users/${id}`, 
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;

