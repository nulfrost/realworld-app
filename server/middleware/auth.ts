import jwt from 'express-jwt';
import { secrets } from 'config';

export const jwtMiddleware = () => {
  return jwt({
    secret: secrets.jwt,
    algorithms: ['HS256'],
    resultProperty: 'locals.token',
  });
};
