import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistedReducer from "./rootReducer";
import { api } from "./services/api";

const middleware: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

middleware.push(api.middleware);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
