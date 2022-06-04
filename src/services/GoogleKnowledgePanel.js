import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    'X-RapidAPI-Host': 'google-web-search.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_GOOGLE_SEARCH_APIKEY
}

const baseUrl = 'https://google-web-search.p.rapidapi.com';

const createRequest = url => ({ url, headers: headers });

export const googleKnowledgePanelApi = createApi({
    reducerPath: 'googleKnowledgePanelApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: builder => ({
        getKnowledgePanel: builder.query({
            query: () => createRequest(`/?query=Ousmane Dembele&max=1`)
        })
    })
})

export const { useGetKnowledgePanelQuery } = googleKnowledgePanelApi;