import {
  InstitutionCourse,
  InstitutionGroup,
  Student,
  Unit,
} from "@/types/prismatypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'
// <Pokemon, string>
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  endpoints: (builder) => ({
    getAllUniversities: builder.query({
      query: (query) => query,
    }),
    getUniversity: builder.query({
      query: (query) => `universities/${query}`,
    }),
    getStudentDetails: builder.query({
      query: (query) => `universities/students/${query}`,
    }),
    getGroupUnits: builder.query({
      query: (query) => `universities/groups/${query}/unit`,
    }),
    getMessages: builder.query({
      query: (query: string) => `universities/chats/${query}`,
    }),
    addUniversity: builder.mutation({
      query: (query) => ({
        url: "universities",
        body: query,
        method: "POST",
      }),
    }),
    addCampus: builder.mutation({
      query: (query) => ({
        url: `universities/${query.uniid}`,
        body: query,
        method: "PATCH",
      }),
    }),

    addCourse: builder.mutation({
      query: (query: InstitutionCourse) => ({
        url: `universities/${query.institutionId}`,
        body: query,
        method: "POST",
      }),
    }),
    addYearGroup: builder.mutation({
      query: (query: InstitutionGroup) => ({
        url: `universities/courses/${query.institutionCourseId}`,
        body: query,
        method: "POST",
      }),
    }),
    addStudent: builder.mutation({
      query: (query) => ({
        url: `universities/students`,
        body: query,
        method: "POST",
      }),
    }),
    addChat: builder.mutation({
      query: (query) => ({
        url: `universities/chats`,
        body: query,
        method: "POST",
      }),
    }),
    connectStudent: builder.mutation({
      query: ({ student, groupId }: { student: Student; groupId: string }) => ({
        url: `universities/groups/${groupId}`,
        method: "POST",
        body: student,
      }),
    }),
    addUnits: builder.mutation({
      query: (query: Unit[]) => ({
        url: `universities/groups/${query[0]?.institutionGroupId}/units`,
        body: query,
        method: "POST",
      }),
    }),
    addUnit: builder.mutation({
      query: (query: Unit) => ({
        url: `universities/groups/${query?.institutionGroupId}/units`,
        body: query,
        method: "POST",
      }),
    }),
    addFile: builder.mutation({
      query: (query) => ({
        url: `universities/uploadS3`,
        body: query,
        method: "POST",
      }),
    }),
    addDBFile: builder.mutation({
      query: (query) => ({
        url: `universities/students/${query.studentId}`,
        body: query,
        method: "POST",
      }),
    }),
    favFile: builder.mutation({
      query: (query: {
        studentId: string;
        fileId: string;
        action: "Fav" | "unFav";
      }) => ({
        url: `universities/students/${query.studentId}`,
        body: query,
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUniversitiesQuery,
  useConnectStudentMutation,
  useAddCampusMutation,
  useAddStudentMutation,
  useAddUniversityMutation,
  useGetUniversityQuery,
  useAddCourseMutation,
  useAddYearGroupMutation,
  useAddUnitMutation,
  useAddUnitsMutation,
  useGetStudentDetailsQuery,
  useGetGroupUnitsQuery,
  useGetMessagesQuery,
  useAddFileMutation,
  useAddChatMutation,
  useAddDBFileMutation,
  useFavFileMutation,
} = pokemonApi;
