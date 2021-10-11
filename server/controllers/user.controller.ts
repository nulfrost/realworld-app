import { Request, Response, NextFunction } from 'express';
import { User, Profile } from '@prisma/client';
import { db } from 'db';
import { secrets } from 'config';
import { Login, Message, Register } from 'types';
import { createServerError, omit } from 'utils/helpers';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import validator from '@/utils/schemas';

export = {
  login: async (
    request: Request<{}, {}, Login>,
    response: Response,
    next: NextFunction
  ) => {
    try {
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

      const user = await db.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: {
            select: {
              id: true,
              image: true,
              username: true,
              bio: true,
            },
          },
        },
      });

      if (!user) {
        return next({
          status: 404,
          title: Message.NOTFOUND,
          description: 'User with that e-mail was not found.',
        });
      }

      const isValidPassword = await bcrypt.compare(password, user!.password);
      if (!isValidPassword)
        return next({
          status: 422,
          title: Message.INVALID,
          description: 'Invalid username or password.',
        });

      const token = jsonwebtoken.sign(
        { id: user?.id },
        secrets?.jwt as string,
        {
          algorithm: 'HS256',
          expiresIn: '1hr',
        }
      );

      return response.status(200).json({
        user: {
          ...omit(['password', 'profile', 'createdAt', 'updatedAt'], user),
          ...omit(['userId'], user?.profile),
          token,
        },
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  register: async (
    request: Request<{}, {}, Register>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {
        user: { email, password, username },
      } = request.body;

      if (!email || !password || !username) {
        return next({
          status: 400,
          title: Message.INVALID,
          description: 'Missing one of: username, password, email',
        });
      }

      const user: User | null = await db.user.findFirst({
        where: {
          email,
          profile: {
            username,
          },
        },
        include: {
          profile: true,
        },
      });

      if (user) {
        return next({
          status: 422,
          title: Message.INVALID,
          description: 'A user with this e-mail or username already exists.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          profile: {
            create: {
              username,
            },
          },
        },
        include: {
          profile: true,
        },
      });
      return response.status(201).json({
        user: {
          ...omit(['password', 'profile', 'createdAt', 'updatedAt'], newUser),
          ...omit(['userId'], newUser?.profile),
        },
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  getCurrentUser: async (_, response: Response, next: NextFunction) => {
    try {
      const userId = response.locals.token.id as string;

      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: {
            select: {
              id: true,
              bio: true,
              image: true,
              username: true,
            },
          },
        },
      });

      return response.status(200).json({
        user: {
          ...omit(['password', 'profile', 'createdAt', 'updatedAt'], user),
          ...omit(['userId'], user?.profile),
        },
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  updateUser: async (
    request: Request<
      {},
      {},
      {
        user: Omit<User & Profile, 'createdAt' | 'updatedAt' | 'userId' | 'id'>;
      }
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {
        user: { username, password, email, bio, image },
      } = request.body;
      const userId = response.locals.token.id as string;

      const user = await db.user.update({
        where: {
          id: userId,
        },
        include: {
          profile: true,
        },
        data: {
          email,
          password,
          profile: {
            update: {
              username,
              image,
              bio,
            },
          },
        },
      });

      return response.status(200).json({
        user: {
          ...omit(['password', 'profile', 'createdAt', 'updatedAt'], user),
          ...omit(['userId'], user?.profile),
        },
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
};
