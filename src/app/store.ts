import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import authReducer from "../features/login/authSlice";
import residentReducer from "../features/resident/residentSlice";
import { api } from "./services/api";

const middleware: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

middleware.push(api.middleware);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    resident: residentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
