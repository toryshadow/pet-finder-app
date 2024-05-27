import { http } from "../api";
import { TServerErrorResponse } from "@/src/types/serverErrorResponse";

export type TFile = {
  path: string;
  id: string;
};

export const uploadFile = async (file: FormData): Promise<{ file: TFile }> => {
  try {
    const response = await http.post<{ file: TFile }>("files/upload", file, {
      headers: {
        accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error as TServerErrorResponse;
  }
};
