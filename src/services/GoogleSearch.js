import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_GOOGLE_SEARCH_APIKEY
}

const baseUrl = 'https://google-search3.p.rapidapi.com';

const createRequest = url => ({url, headers: headers});

export const googleSearchApi = createApi({
    reducerPath: 'googleSearchApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: builder => ({
        getSearch: builder.query({
            query: () => createRequest(`/api/v1/search/q=elon+musk`)
        }),
        getImage: builder.query({
            query: () => createRequest(`/api/v1/image/q=tesla`)
        }),
        getNews: builder.query({
            query: () => createRequest(`/api/v1/news/q=tesla`)
        }),
        getVideo: builder.query({
            query: () => createRequest(`/api/v1/video/q=iphone+reviews`)
        })
    })
})

export const { useGetSearchQuery, useGetImageQuery, useGetNewsQuery, useGetVideoQuery } = googleSearchApi;

