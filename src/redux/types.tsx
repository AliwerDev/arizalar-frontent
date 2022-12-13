export enum Types {
  SET_USER = "SET_USER",
  SET_DUTY_LIST = "SET_DUTY_LIST",
  SET_MY_DUTY = "SET_MY_DUTY",
  SET_USERS = "SET_USERS",
}

export interface IUserReducer {
  user: any;
  allUsers: any[];
}
export interface IDutyReducer {
  myDutyList: any[] | null;
  dutyList: any[] | null;
}
