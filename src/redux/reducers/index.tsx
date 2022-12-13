import { combineReducers } from "redux";
import { IDutyReducer, IUserReducer } from "../types";
import { dutyReducer } from "./dutyReducer";
import { userReducer } from "./userReducer";

export interface IRootState {
  user: IUserReducer;
  duty: IDutyReducer;
}

const rootReducer = combineReducers<IRootState>({
  user: userReducer,
  duty: dutyReducer,
});

export default rootReducer;
