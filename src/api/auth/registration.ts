import { TRegister } from "@/src/types";
import { http } from "../api";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";
import { TUser } from "@/src/types/user";
import { AxiosResponse } from "axios";

type TLoginResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: TUser;
};

export const registerRequest = async (payload: TRegister) => {
  try {
    const response = await http.post<TRegister, AxiosResponse<TLoginResponse>>(
      "auth/email/register",
      payload,
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};
