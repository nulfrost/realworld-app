import { NextFunction, Request, Response } from 'express';
import { db } from 'db';
import { createServerError, omit } from 'utils/helpers';

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
          author: true,
        },
        take: limit || 20,
        skip: offset || 0,
        orderBy: {
          createdAt: 'desc',
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
      });

      return response.status(200).json(article);
    } catch (error) {
      return next(createServerError(error));
    }
  },
};
