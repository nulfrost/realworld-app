import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { db } from "db";
import { secrets } from "config";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import validator from "utils/schemas";

interface Login {
  email: string;
  password: string;
}

export = {
  login: async (request: Request, response: Response, next: NextFunction) => {
    const { password, email } = request.body as Login;

    const isValidLogin = validator.loginValidator(request.body);
    if (!isValidLogin) return next({ status: 422, message: isValidLogin });

    const user: User | null = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });

    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword)
      return next({ status: 422, message: "Invalid username or password." });

    const token = jsonwebtoken.sign({ id: user?.id }, secrets?.jwt as string, {
      algorithm: "HS256",
    });

    response.status(200).json({ token, user });
  },
};
