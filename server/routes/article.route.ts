import articleController from 'controllers/article.controller';
import express from 'express';
import { jwtMiddleware } from 'middleware/auth';

const router = express.Router();

router.route('/articles').get(articleController.getArticles);
router
  .route('/articles/:slug')
  .get(jwtMiddleware(), articleController.getSingleArticle)
  .delete(jwtMiddleware(), articleController.deleteArticle);

export default router;
