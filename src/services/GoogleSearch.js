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
            query: () => createRequest(`/api/v1/search/q=nike&num=20&hl=en`)
        }),
        getImage: builder.query({
            query: () => createRequest(`/api/v1/image/q=nike&num=100&hl=en`)
        }),
        getNews: builder.query({
            query: () => createRequest(`/api/v1/news/q=nike&num=15`)
        }),
        getVideo: builder.query({
            query: () => createRequest(`/api/v1/video/q=nike&num=15&hl=en`)
        })
    })
})

export const { useGetSearchQuery, useGetImageQuery, useGetNewsQuery, useGetVideoQuery } = googleSearchApi;

