import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
  urlDesc: String,
  url: String,
  clickNumber: {
    type: Number,
    default: 0
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    requred: [true, "Email is requred"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists!"],
    requred: [true, "Username is requred"],
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  links: [linkSchema],
});

export default models.User || model("User", UserSchema);
