import { http } from "../api";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";
import { TUser } from "@/src/types/user";
import { AxiosResponse } from "axios";

export const USER_KEY = "user-key";

export const meRequest = async (): Promise<TUser> => {
  try {
    const response = await http.get<AxiosResponse<TUser>>("auth/me");

    console.log(response);
    return response.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};
