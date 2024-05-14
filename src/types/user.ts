export type TUser = {
  email: "test1@example.com";
  id: 3;
  provider: "email";
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: string | null;
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
