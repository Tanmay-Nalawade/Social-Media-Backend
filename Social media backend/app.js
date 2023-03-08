// Youtube video : "https://www.youtube.com/watch?v=_ee38nL13mE&t=1517s"

import express from "express";
import mongoose from "mongoose";
import router from "./Routes/user-routes.js";
import blogRouter from "./Routes/blog-routes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    // useUnififedTopology: true,
  })
  .then(() => app.listen(3000))
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/home", (req, res, next) => {
  res.send("Hello");
});
