import articleController from '@/controllers/article.controller';
import express from 'express';

const router = express.Router();

router.route('/articles').get(articleController.getArticles);

export default router;
