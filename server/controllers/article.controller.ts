import { NextFunction, Request, Response } from 'express';
import { db } from 'db';
import { createServerError, omit, slugify } from 'utils/helpers';
import { Article } from 'types';

type Query = { tag: string; author: string; limit: number; offset: number };
type Param = { slug: string };

export = {
  getArticles: async (
    request: Request<{}, {}, {}, Query>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { author, tag, limit, offset } = request.query;

      const articles = await db.article.findMany({
        where: {
          AND: [
            {
              author: {
                username: {
                  contains: author,
                  mode: 'insensitive',
                },
              },
            },
            {
              tags: {
                contains: tag,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              bio: true,
              image: true,
            },
          },
        },
        take: limit || 20,
        skip: offset || 0,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const articlesCount = await db.article.count({
        where: {
          AND: [
            {
              author: {
                username: {
                  contains: author,
                  mode: 'insensitive',
                },
              },
            },
            {
              tags: {
                contains: tag,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      const articlesWithAuthor = articles.map((article) => ({
        ...omit(['profileId'], article),
        author: {
          id: article?.author?.id,
          username: article?.author?.username,
          bio: article?.author?.bio,
          image: article?.author?.image,
        },
      }));

      return response.status(200).json({
        articles: articlesWithAuthor,
        articlesCount,
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  getSingleArticle: async (
    request: Request<Param, {}, {}, {}>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { slug } = request.params;

      const article = await db.article.findFirst({
        where: {
          slug: {
            startsWith: slug,
          },
        },
        include: {
          author: {
            select: {
              username: true,
              bio: true,
              image: true,
            },
          },
        },
      });

      return response.status(200).json({
        article: {
          ...omit(['profileId'], article),
        },
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  updateArticle: async (
    request: Request<Param, {}, Article, {}>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {
        article: { title, description, body },
      } = request.body;
      const { slug } = request.params;
      const userId = response.locals.token.id as string;
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          profile: true,
        },
      });
      await db.$executeRaw`UPDATE articles SET (title, description, body, slug) = (${title}, ${description}, ${body}, ${slugify(
        title
      )}) WHERE slug = ${slug} AND "profileId" = ${user?.profile?.id}`;

      return response.status(200).json({
        status: 200,
        title: 'success',
        description: 'Article was successfully updated.',
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
  deleteArticle: async (
    request: Request<Param, {}, {}, {}>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { slug } = request.params;
      const userId = response.locals.token.id as string;
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          profile: true,
        },
      });

      await db.$executeRaw`DELETE FROM articles WHERE "profileId" = ${user?.profile?.id} AND slug = ${slug}`;
      return response.status(200).json({
        status: 200,
        title: 'success',
        description: 'Article was successfully deleted.',
      });
    } catch (error) {
      return next(createServerError(error));
    }
  },
};
