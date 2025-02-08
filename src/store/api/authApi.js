import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json'); 
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    toast.success('Login successful!');
                    return data;  
                } catch (error) {
                    const message = error.error?.data?.message || 'Failed to login. Please check your credentials.';
                    toast.error(message);
                }
            },
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration successful!');
                } catch (error) {
                    const message = error.error?.data?.message || 'Failed to register. Please try again.';
                    toast.error(message);
                }
            },
        }),
        updateMembership: builder.mutation({
            query: (membershipData) => ({
                url: '/users/update-profile',
                method: 'PATCH',
                body: membershipData, 
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Membership updated successfully!');
                } catch (error) {
                    toast.error('Failed to update membership.');
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useUpdateMembershipMutation } = authApi;
