import { api } from "./api";

export interface IAttendance {
  programId: number | null;
  residentId: number | null;
  status: string | null;
}

export interface IResident {
  id?: number;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  status: string;
  room: string;
  levelOfCare: string;
  ambulation: string;
  birthDate: string;
  moveInDate: string;
  createdAt?: string;
  updatedAt?: string;
  applicantId?: string | null;
  attendance: IAttendance[];
}

export interface IAddResidentRequest {
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  status: string;
  room: string;
  levelOfCare: string;
  ambulation: string;
  birthDate: string;
  moveInDate: string;
}

type ResidentsResponse = IResident[];

export const residentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getResidents: builder.query<ResidentsResponse, void>({
      query: () => ({ url: "residents" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Residents", id } as const)),
        { type: "Residents" as const, id: "LIST" },
      ],
    }),
    addResident: builder.mutation<IResident, Partial<IResident>>({
      query: (body) => ({
        url: `residents`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Residents", id: "LIST" }],
    }),
  }),
});

export const { useGetResidentsQuery, useAddResidentMutation } = residentsApi;
