import { Schema, model, models } from "mongoose";

const RestrictedUserNameSchema = new Schema({

    username: {
      type: String,
      lowercase: [true, "Username is lovercase"], 
      unique: [true, "Username already exists!"],

    },
    
  });
  
  export default models.RestrictedUserName || model("RestrictedUserName", RestrictedUserNameSchema);
  