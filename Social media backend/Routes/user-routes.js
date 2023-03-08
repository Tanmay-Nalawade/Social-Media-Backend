import express from "express";
import { getAllUsers, signUp, login } from "../Controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
