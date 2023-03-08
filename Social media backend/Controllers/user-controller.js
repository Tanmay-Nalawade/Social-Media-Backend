// http requests are always a aysnc task
// Always use the try catch block while using the database as the db operation can fail as well

import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find(); //find() function is used to find particular data from the MongoDB database.
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No user found" });
  }
  return res.status(200).json({ users }); //status 200 is success ans users will give only the user name because of the es6 syntax
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body; //req.body which we will recieve from the frontend
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.send(400).json({ message: "User Already Exists" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword, //defining without the key value pair as in es 6
    blogs: [],
  });

  try {
    user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.send(404).json({ message: "User does not Exists" });
  }

  const isPasswordCorret = bcrypt.compareSync(password, existingUser.password);

  if (isPasswordCorret) {
    return res.status(404).json({ message: "Logged in successfully" });
  } else {
    return res.status(404).json({ message: "Incorrect Password" });
  }
};
