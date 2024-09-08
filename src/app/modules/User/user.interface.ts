export interface IUser {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
}

export interface ILogin {
  email: string;
  password: string;
}
