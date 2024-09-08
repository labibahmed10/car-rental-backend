import { userRole } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  phone: string;
  address: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof userRole;
