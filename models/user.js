import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists !"],
    required: [true, "email is required !"],
  },
  username: {
    type: String,
    unique: [true, "username already exists !"],
    required: [true, "username is required !"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const user = models.User || model("User", userSchema);

export default user;