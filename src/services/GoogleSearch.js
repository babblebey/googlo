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
            query: (q) => createRequest(`/api/v1/search/${q}`)
        }),
        getImage: builder.query({
            query: (q) => createRequest(`/api/v1/image/${q}`)
        }),
        getNews: builder.query({
            query: (q) => createRequest(`/api/v1/news/${q}`)
        }),
        getVideo: builder.query({
            query: (q) => createRequest(`/api/v1/video/${q}`)
        })
    })
})

export const { useGetSearchQuery, useGetImageQuery, useGetNewsQuery, useGetVideoQuery } = googleSearchApi;

