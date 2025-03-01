import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:3000/api/auth",
        credentials: 'include' 
    }),
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query: (newUser)=>({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials)=>({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: ()=>({
                url: '/logout',
                method: 'POST',
            })
        }),
        getUser: builder.query({
            query: ()=>({
                url: '/users',
                method: 'GET',
            }),
            refetchOnMount: true,
            invalidatesTags: ['User']
        }),
        deleteUsers: builder.mutation({
            query: (userId)=>({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
        })
        // updateUserRole: builder.mutation({
        //     query: ({userId, role})=>({
        //         url: `/users/${userId}`,
        //         method: 'PUT',
        //         body: {role},
        //     }),
        //     refetchOnMount: true,
        //     invalidatesTags: ['User']
        // })
    }),
    
  })
//   useUpdateUserRoleMutation

  export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUsersMutation } = authApi;

export default authApi;