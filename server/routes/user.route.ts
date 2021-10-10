import express from "express";
import userController from "@/controllers/user.controller";

const router = express.Router();

router.route("/users/login").post(userController.login);

export { router };
