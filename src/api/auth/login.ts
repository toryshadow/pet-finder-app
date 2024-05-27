import { TLogin } from "@/src/types";
import { http } from "../api";
import { TUser } from "@/src/types/user";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";

export type TLoginResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: TUser;
};

export const loginRequest = async (payload: TLogin) => {
  try {
    const response = await http.post<TLogin, AxiosResponse<TLoginResponse>>(
      "auth/email/login",
      payload,
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const logoutRequest = async () => {
  try {
    await http.post("auth/logout");
  } catch (error) {
    throw error as AxiosError;
  }
};
