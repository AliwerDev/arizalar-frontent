import axios from "axios";
import { pick } from "lodash";
import { SignInDataType, SignUpDataType } from "../components/types";
const baseUrl1 = "https://arizalar-backend.vercel.app/api/";

export const tokenName = "application_token";

let instanceAxios: any;
const getInstanceAxios = () => {
  instanceAxios = axios.create({
    baseURL: baseUrl1,
    headers: {
      "x-auth-token": `${localStorage.getItem(tokenName)}`,
    },
  });
};
getInstanceAxios();

// signUp
export const signUpAxios = async (data: SignUpDataType) => {
  try {
    const res = await axios.post(`${baseUrl1}auth/register`, data);
    signInAxios(pick(data, ["username", "password"]));
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
// sign in
export const signInAxios = async (user: SignInDataType) => {
  try {
    const { data } = await axios.post(`${baseUrl1}auth/login`, {
      ...user,
    });
    localStorage.setItem(tokenName, data.data.token);
    getInstanceAxios();
    return data;
  } catch (error: any) {
    return error;
  }
};

// get userData

export const getMethodAxios = async (url: string) => {
  try {
    const res = await instanceAxios.get(url);
    return res.data;
  } catch (error) {
    return error;
  }
};

// put method axios
export const putMethodAxios = async (url: string, data: any) => {
  try {
    const res = await instanceAxios.put(url, data);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

// post method axios
export const postMethodAxios = async (url: string, data: any) => {
  try {
    const res = await instanceAxios.post(url, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete method axios
export const deleteMethodAxios = async (url: string) => {
  try {
    const res = await instanceAxios.delete(url);
    return res.data;
  } catch (error) {
    return error;
  }
};
