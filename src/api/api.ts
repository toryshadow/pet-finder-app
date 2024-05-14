import { stringify } from "querystring";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";

type TParamValue = string | number | string[] | undefined | null | boolean;
console.log(process.env.EXPO_PUBLIC_API_URL);
export const http = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/v1/`,
  paramsSerializer: (params) => {
    const values = Object.keys(params).reduce(
      (acc, key) => {
        const value = params[key] as TParamValue;

        if (
          value ||
          (typeof value === "number" && !isNaN(value)) ||
          (Array.isArray(value) && value.length > 0) ||
          (value !== null && value !== undefined)
        ) {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, TParamValue>,
    );

    return stringify(values);
  },
});

http.interceptors.response.use(
  (response) => response,

  (error: AxiosError<TServerErrorResponse>) => {
    // if (typeof error?.response?.data?.detail == "string") {
    // toastService.error(error?.response?.data?.detail || 'Unknown error');
    // } else {
    // toastService.error(error?.response?.data?.detail?.message || 'Unknown error');
    // }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      // Storage.clearUserSession();
      // window.location.replace(links.auth.login);
    }

    return Promise.reject(error);
  },
);

export const setToken = (token: string) => {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
