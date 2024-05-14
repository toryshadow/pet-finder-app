export type TServerErrorResponse =
  | {
      message: string;
      status_code?: number;
      success: boolean;
    }
  | string;
