import express from 'express';
import profileController from 'controllers/profile.controller';
import { jwtMiddleware } from 'middleware/auth';

const router = express.Router();

router
  .route('/profiles/:username')
  .get(jwtMiddleware(), profileController.getProfile);

export default router;
