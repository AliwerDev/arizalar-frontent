import { IUserReducer, Types } from "../types";

const initialState = {
  user: {},
  allUsers: [],
};

export const userReducer = (
  state: IUserReducer = initialState,
  action: { payload: any; type: string }
): IUserReducer => {
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Types.SET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};
