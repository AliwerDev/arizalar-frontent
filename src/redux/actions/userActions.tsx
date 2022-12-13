import { getMethodAxios } from "../../api";
import { dispatch } from "../store";
import { Types } from "../types";

export const setUserAction = (data: any) => {
  dispatch({ type: Types.SET_USER, payload: data });
};

export const setUsersAction = async () => {
  const res = await getMethodAxios(`user`);
  dispatch({ type: Types.SET_USERS, payload: res.data });
};
