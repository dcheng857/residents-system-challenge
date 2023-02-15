import { api } from "./api";
import { IAttendance } from "./residents";

interface IRecurrence {
  byMonth: number;
  interval: number;
  frequency: string;
  byMonthday: number;
}

export interface IProgram {
  id?: number;
  parentId: number | null;
  name: string;
  location: string;
  allDay: boolean;
  start: string;
  end: string;
  tags: string[];
  dimension: string;
  facilitators: string[];
  levelOfCare: string[];
  hobbies: string[];
  recurrence: IRecurrence | undefined;
  isRepeated: boolean;
  applicantId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  attendance: IAttendance[];
}

export interface IAddProgramRequest {
  parentId: number | null;
  name: string;
  location: string;
  allDay: boolean;
  start: string;
  end: string;
  tags: string[];
  dimension: string;
  facilitators: string[];
  levelOfCare: string[];
  hobbies: string[];
  recurrence: boolean | null;
  isRepeated: boolean;
  applicantId?: string | null;
}

type ProgramsResponse = IProgram[];

export const programsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<ProgramsResponse, void>({
      query: () => ({ url: "programs" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Programs", id } as const)),
        { type: "Programs" as const, id: "LIST" },
      ],
    }),
    addProgram: builder.mutation<IProgram, Partial<IProgram>>({
      query: (body) => ({
        url: `programs`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Programs", id: "LIST" }],
    }),
    attendProgram: builder.mutation<IAttendance, Partial<IAttendance>>({
      query(data) {
        const { programId, ...body } = data;
        return {
          url: `/programs/${programId}/attend`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (program) => [
        { type: "Programs", id: "LIST" },
        { type: "Residents", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useAddProgramMutation,
  useAttendProgramMutation,
} = programsApi;
