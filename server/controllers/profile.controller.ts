import { NextFunction, Request, Response } from 'express';
import { Profile } from '@prisma/client';
import { db } from 'db';
import { Message } from 'types';
import { createServerError } from 'utils/helpers';

export = {
  getProfile: async (
    request: Request<Omit<Profile, 'id' | 'userId'>>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { username } = request.params;

      const user = await db.profile.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
          bio: true,
          image: true,
        },
      });

      if (!user) {
        return next({
          status: 404,
          title: Message.NOTFOUND,
          description: `Profile not found for user ${user.username}`,
        });
      }

      return response.status(200).json({ profile: { ...user } });
    } catch (error) {
      return next(createServerError(error));
    }
  },
};
