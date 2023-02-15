import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/login/authSlice";
import residentReducer from "../features/resident/residentSlice";
import { api } from "./services/api";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  resident: residentReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
