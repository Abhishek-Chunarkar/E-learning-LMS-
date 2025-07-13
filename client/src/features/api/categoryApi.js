import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

const CATEGORY_API = `${API_BASE_URL}/api/v1/category`;

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: CATEGORY_API,
        credentials: 'include'
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            }),
            providesTags: ['Category']
        })
    })
});

export const {
    useGetAllCategoriesQuery
} = categoryApi; 