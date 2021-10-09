import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.use("/users").get("/login", userController.login);

export { router };
