import dotenv from 'dotenv';
dotenv.config();

export const secrets = {
  jwt: process.env.JWT_SECRET,
  testDB: process.env.TEST_DATABASE_URL,
  prodDB: process.env.DATABASE_URL,
} as const;
