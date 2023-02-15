import authReducer, {
  IUser,
  IUserState,
  logout,
  setCredentials,
} from "./authSlice";

describe("resident reducer", () => {
  const initialState: IUserState = {
    user: null,
    isAuthenticated: false,
  };

  const sampleUser: IUser = {
    id: 11,
    token: "2e7702fa-bf71-484b-8249-ec6f702ed7f5",
    email: "szejiec@gmail.com",
    url: null,
    starts: 88,
    submissions: 0,
    firstStart: "2023-02-11T19:27:44.932Z",
    firstSubmission: "2023-02-11T19:27:45.259Z",
    lastSubmission: "2023-02-11T19:27:45.259Z",
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle set credentials", () => {
    const actual = authReducer(initialState, setCredentials(sampleUser));
    expect(actual.user).toEqual(sampleUser);
    expect(actual.isAuthenticated).toEqual(true);
  });

  it("should handle logout", () => {
    const actual = authReducer(initialState, logout());
    expect(actual).toEqual(initialState);
  });
});
