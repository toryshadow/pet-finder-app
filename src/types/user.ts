import { TFile } from "@/src/api";

export type TUser = {
  email: string;
  id: number;
  provider: "email" | "google" | "facebook";
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: TFile | null;
  role?: TRole | null;
  status?: TStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type TRole = {
  id: number;
  name?: string;
};

export type TStatus = {
  id: number;
  name?: string;
};
