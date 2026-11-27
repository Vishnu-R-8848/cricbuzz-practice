import { Schema, model } from "mongoose";
import { ROLES } from "../constant/model.contanst.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.SCORER,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default: "https://px.pixxo.io/test/user.png"
  }
});

const userModel = model("User", userSchema);

export default userModel;
