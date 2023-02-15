import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResident } from "../../app/services/residents";
import type { RootState } from "../../app/store";

interface IResidentState {
  attendToOpen: boolean;
  resident: IResident | null;
}

const initialState: IResidentState = {
  attendToOpen: false,
  resident: null,
};

const slice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    setSelectedResident: (state, action: PayloadAction<IResident>) => {
      state.resident = action.payload;
    },
    openAttendProgram: (state) => {
      state.attendToOpen = true;
    },
    closeAttendProgram: (state) => {
      state.attendToOpen = false;
    },
  },
});

export const { openAttendProgram, closeAttendProgram, setSelectedResident } =
  slice.actions;
export default slice.reducer;

export const selectAttendToOpen = (state: RootState) =>
  state.resident.attendToOpen;

export const selectResident = (state: RootState) => state.resident.resident;
