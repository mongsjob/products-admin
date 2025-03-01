import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const infoApi = createApi({
    reducerPath: 'infoApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3000',
        credentials: 'include',
        
    }),
    tagTypes: ['Info'],
    endpoints: (builder) => ({
      fetchInfo: builder.query({
        query: () => ({
            url: '/api/info',
            method: 'GET',
        }),
        providesTags: ['Info'],
      }),
      postInfo: builder.mutation({
        query: (newPost)=>({
          url: '/api/info/create-post',
          method: 'POST',
          body: newPost,
        }),
        invalidatesTags: ['Info'],
      }),
      deleteInfo: builder.mutation({
        query: (id)=>({
          url: `/api/info/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, {id})=> [{type: 'Info', id}, { type: 'Info' }]
      })
    }),
  })
  
  export const { useFetchInfoQuery, usePostInfoMutation, useDeleteInfoMutation } = infoApi;
  export default infoApi;