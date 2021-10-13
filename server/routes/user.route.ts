import express from 'express';
import userController from 'controllers/user.controller';
import { jwtMiddleware } from 'middleware/auth';

const router = express.Router();

router.route('/users/login').post(userController.login);
router.route('/users').post(userController.register);
router
  .route('/users')
  .get(jwtMiddleware(), userController.getCurrentUser)
  .put(jwtMiddleware(), userController.updateUser);

export default router;
