import express from 'express';
import profileController from '@/controllers/profile.controller';
import jwt from 'express-jwt';
import { secrets } from 'config';

const router = express.Router();

router
  .route('/profiles/:username')
  .get(
    jwt({ secret: secrets.jwt, algorithms: ['HS256'], resultProperty: 'locals.token' }),
    profileController.getProfile
  );

export { router };
