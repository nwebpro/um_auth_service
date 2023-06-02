import { Model, Schema, model } from "mongoose";
import { IUser } from "./Users.interface";

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Database a automatic created and updated time
  }
);

export const User = model<IUser, UserModel>("User", userSchema);
