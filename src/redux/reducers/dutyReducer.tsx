import { IDutyReducer, Types } from "../types";

const initialState = {
  myDutyList: null,
  dutyList: null,
};

export const dutyReducer = (
  state: IDutyReducer = initialState,
  action: { payload: any; type: string }
): IDutyReducer => {
  switch (action.type) {
    case Types.SET_DUTY_LIST:
      return {
        ...state,
        dutyList: action.payload,
      };
    case Types.SET_MY_DUTY:
      return {
        ...state,
        myDutyList: action.payload,
      };
    default:
      return state;
  }
};
