import { TUserRole } from "./user.interface";

export const userRole = {
  admin: "admin",
  user: "user",
} as const;

export const Role: TUserRole[] = ["user", "admin"];
