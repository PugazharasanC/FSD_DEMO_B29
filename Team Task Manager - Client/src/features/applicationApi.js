import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // auth
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
      }),
    }),

    // tasks
    getAllTasks: builder.query({
      query: () => ({
        url: `/tasks`,
      }),
    }),
    createTask: builder.mutation({
      query: (payload) => ({
        url: "/tasks",
        method: "POST",
        body: payload,
      }),
    }),
    // users
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          // url: `/users?${Object.keys(params)
          //   .map((key) => key + "=" + params[key])
          //   .join("&")}`,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/users/${id}/role`,
          method: "PUT",
          body: { role },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useCreateTaskMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = appApi;
