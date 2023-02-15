import { IResident } from "../../app/services/residents";
import residentReducer, {
  closeAttendProgram,
  IResidentState,
  openAttendProgram,
  setSelectedResident,
} from "./residentSlice";

describe("resident reducer", () => {
  const initialState: IResidentState = {
    attendToOpen: false,
    resident: null,
  };

  const sampleResident: IResident = {
    id: 1,
    name: "Jeff Winger",
    firstName: "Jeffrey",
    lastName: "Winger",
    preferredName: "Jeff",
    status: "HERE",
    room: "204",
    levelOfCare: "INDEPENDENT",
    ambulation: "CANE",
    birthDate: "1974-11-20T07:00:00.000Z",
    moveInDate: "2009-09-17T07:00:00.000Z",
    createdAt: "2009-09-17T04:44:10.000Z",
    updatedAt: "2009-09-17T04:44:10.000Z",
    applicantId: null,
    attendance: [],
  };

  it("should handle initial state", () => {
    expect(residentReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle open the attend to pop up", () => {
    const actual = residentReducer(initialState, openAttendProgram());
    expect(actual.attendToOpen).toEqual(true);
  });

  it("should handle close the attend to pop up", () => {
    const actual = residentReducer(initialState, closeAttendProgram());
    expect(actual.attendToOpen).toEqual(false);
  });

  it("should handle set resident", () => {
    const actual = residentReducer(
      initialState,
      setSelectedResident(sampleResident)
    );
    expect(actual.resident).toEqual(sampleResident);
  });
});
