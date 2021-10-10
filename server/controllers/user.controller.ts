import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { db } from "db";
import { secrets } from "config";
import { Login, Message } from "types";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import validator from "@/utils/schemas";

export = {
  login: async (
    request: Request<{}, {}, Login>,
    response: Response,
    next: NextFunction
  ) => {
    const {
      user: { password, email },
    } = request.body;

    const isValidLogin = validator.loginValidator(request.body);
    if (!isValidLogin)
      return next({
        status: 422,
        title: Message.INVALID,
        description: isValidLogin,
      });

    const user: User | null = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return next({
        status: 404,
        title: Message.NOTFOUND,
        description: "User with that e-mail was not found.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword)
      return next({
        status: 422,
        title: Message.INVALID,
        description: "Invalid username or password.",
      });

    const token = jsonwebtoken.sign({ id: user?.id }, secrets?.jwt as string, {
      algorithm: "HS256",
    });

    return response.status(200).json({ token, user });
  },
};
