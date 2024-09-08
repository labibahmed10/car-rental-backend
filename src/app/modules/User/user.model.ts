import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { Role } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config/config";

// user schema
const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      enum: [...Role],
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this; // doc

  // Only hash the password if it has been modified (or is new)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, config.bcrypt_salt_rounds);
  }

  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// user model static function (isUserExistById)
userSchema.statics.isUserExistById = async function (id: string) {
  return await UserModel.findById(id);
};

// user model static function (isUserExistByEmail)
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};

// user model static function (isPasswordMatched)
userSchema.statics.isPasswordMatched = async function (plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// user model
export const UserModel = model<IUser, IUserModel>("User", userSchema);
const use = "me";
