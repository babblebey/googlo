import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
    'X-RapidAPI-Key': 'f93c4349f2mshc013ab6964bca9ap1b04d2jsna3010d9dca5a'
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

