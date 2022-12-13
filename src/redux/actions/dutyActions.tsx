import { getMethodAxios } from "../../api";
import { dispatch } from "../store";
import { Types } from "../types";

export const setDutyListAction = async (userId: string) => {
  const res = await getMethodAxios(`duty/byUser/${userId}`);
  dispatch({
    type: Types.SET_DUTY_LIST,
    payload: res.data,
  });
};

export const setMyDutyAction = async (userId: string) => {
  const res = await getMethodAxios(`duty/byAdmin/${userId}`);
  dispatch({
    type: Types.SET_MY_DUTY,
    payload: res.data,
  });
};
