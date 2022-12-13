export type SignInDataType = {
  username: string;
  password: string;
};
export type SignUpDataType = {
  username: string;
  password: string;
  fullName: string;
};
export type AddDutyType = {
  name: string;
  description: string;
};
export const styleFlex: { [key: string]: string } = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
