import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
  urlDesc: String,
  url: String,
  clickNumber: {
    type: Number,
    default: 0,
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
  userType:  {
    type: String,
    default: "user"
  },
  borderRadius:
  {
    type: String,
    default: "rounded-none"
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  links: [linkSchema],
  linksBackgroundColor: {
    type: String,
    default: "#f87171",
  },
  linksTextColor: {
    type: String,
    default: "#ffffff",
  },
  pageBackgroundColor: {
    type: String,
    default: "#f3f4f6",
  },
  descriptionTextColor: {
    type: String,
    default: "#000000",
  },
});

export default models.User || model("User", UserSchema);
