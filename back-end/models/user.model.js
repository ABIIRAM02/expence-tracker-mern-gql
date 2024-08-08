import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
