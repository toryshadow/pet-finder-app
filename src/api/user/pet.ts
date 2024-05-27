import { http } from "../api";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";
import { AxiosResponse } from "axios";
import { TPet } from "@/src/types/pet";
import * as queryString from "querystring";
import { AxiosError } from "axios";
import { TLoginResponse } from "@/src/api";

export const GET_PET_KEY = "get-pet-key";
export const CREATE_PET_KEY = "create-pet-key";

type TGetPetRequest = {
  page: number;
  limit: number;
  filters?: {
    [key: string]: string | number;
  };
  sort?: {
    [key: string]: string | number;
  };
};

type TCreatePetRequest = {
  name: string;
  description: string;
  lastSeenLocation: string;
  lastSeenDate: Date;
  photo?: string;
  type?: string;
};

export const getPets = async (
  page: number,
  limit: number,
  filters?: {},
  sort?: {},
): Promise<TPet[]> => {
  try {
    const data = { page, limit } as TGetPetRequest;

    if (filters) {
      data.filters = filters;
    }
    if (sort) {
      data.sort = sort;
    }

    const requestQuery = queryString.stringify(data);
    const response = await http.get<AxiosResponse<TPet[]>>(
      `pet?${requestQuery}`,
    );

    return response.data?.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};

export const getPetById = async (id: string): Promise<TPet> => {
  try {
    const response = await http.get<AxiosResponse<TPet>>(`pet/${id}`);

    return response.data?.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};

export const createPetRequest = async (payload: TCreatePetRequest) => {
  try {
    const response = await http.post<
      TCreatePetRequest,
      AxiosResponse<TLoginResponse>
    >("pet", payload);

    console.log(response);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};
