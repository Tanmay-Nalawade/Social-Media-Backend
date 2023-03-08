import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }], //An array as a user can contain multiple blogs
});

export default mongoose.model("User", userSchema);
//in mongo db the "User" will be stored as users
