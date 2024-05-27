import { TUser } from "@/src/types/user";
import { TFile } from "@/src/api";

export type TPet = {
  id: number;

  name: string;

  description: string;

  lastSeenLocation: string;

  lastSeenDate: Date;

  status: string;

  photo?: TFile | null;

  owner: TUser;

  type: PetType;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type PetType = {
  id: number;
  name?: string;
};
