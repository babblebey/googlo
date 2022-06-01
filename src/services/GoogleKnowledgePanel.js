import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-RapidAPI-Host': 'google-web-search.p.rapidapi.com',
    'X-RapidAPI-Key': 'f93c4349f2mshc013ab6964bca9ap1b04d2jsna3010d9dca5a'
}

const baseUrl = 'https://google-web-search.p.rapidapi.com';

const createRequest = url => ({ url, headers: headers });

export const googleKnowledgePanelApi = createApi({
    reducerPath: 'googleKnowledgePanelApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: builder => ({
        getKnowledgePanel: builder.query({
            query: () => createRequest(`/?query=Nike&max=1`)
        })
    })
})

export const { useGetKnowledgePanelQuery } = googleKnowledgePanelApi;