import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { db } from "db";
import { secrets } from "config";
import { Login, Error } from "types";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import validator from "@/utils/schemas";

export = {
  login: async (
    request: Request<{}, {}, Login>,
    response: Response,
    next: NextFunction
  ) => {
    const { password, email } = request.body;

    const isValidLogin = validator.loginValidator(request.body);
    if (!isValidLogin)
      return next({
        status: 422,
        title: Error.INVALID,
        message: isValidLogin,
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
        title: Error.NOTFOUND,
        message: "User does not exist.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword)
      return next({
        status: 422,
        title: Error.INVALID,
        message: "Invalid username or password.",
      });

    const token = jsonwebtoken.sign({ id: user?.id }, secrets?.jwt as string, {
      algorithm: "HS256",
    });

    return response.status(200).json({ token, user });
  },
};
