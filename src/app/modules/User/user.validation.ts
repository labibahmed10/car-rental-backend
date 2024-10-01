import { z } from "zod";
import { Role, UserStatus } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be 6 character or longer"),
    address: z.string({ required_error: "Address is required" }),
    phone: z.string({ required_error: "Phone is required" }),
    role: z.enum([...Role] as [string, ...string[]]).default("user"),
    status: z.enum([...UserStatus] as [string, ...string[]]).default("active"),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be 6 character or longer"),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
