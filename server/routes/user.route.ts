import express from 'express';
import userController from '@/controllers/user.controller';
import jwt from 'express-jwt';
import { secrets } from 'config';

const router = express.Router();

router.route('/users/login').post(userController.login);
router.route('/users').post(userController.register);
router
  .route('/users')
  .get(
    jwt({ secret: secrets.jwt, algorithms: ['HS256'], resultProperty: 'locals.token' }),
    userController.getCurrentUser
  )
  .put(
    jwt({ secret: secrets.jwt, algorithms: ['HS256'], resultProperty: 'locals.token' }),
    userController.updateUser
  );

export { router };
