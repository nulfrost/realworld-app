import { PrismaClient } from '@prisma/client';
import { secrets } from 'config';
import dotenv from 'dotenv';
dotenv.config();

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'test' ? secrets.testDB : secrets.prodDB,
    },
  },
});

export { db };
