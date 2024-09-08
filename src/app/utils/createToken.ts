import jwt from "jsonwebtoken";

const createToken = (payload: object, secret: string, expiresIn: string) => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error: any) {
    throw new Error("Token creation failed: " + error.message);
  }
};

export default createToken;
