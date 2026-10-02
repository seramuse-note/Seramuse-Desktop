import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { environment } from '@/shared/lib/environment'
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiUrl
  }),
  tagTypes: ['Auth', 'User'],
  endpoints: () => ({})
})
