import { http } from "../api";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";
import { TUser } from "@/src/types/user";
import { AxiosResponse } from "axios";

export const USER_KEY = "user-key";
export const USER_UPDATE_KEY = "user-update-key";

export const meRequest = async (): Promise<TUser> => {
  try {
    const response = await http.get<TUser>("auth/me");

    return response.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};

export const meUpdate = async (user: Partial<TUser>): Promise<TUser> => {
  try {
    const response = await http.patch<TUser, AxiosResponse<TUser>>(
      "auth/me",
      user,
    );

    console.log("ME UPDATE response", response);

    return response.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};
