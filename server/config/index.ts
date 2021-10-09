import dotenv from "dotenv";
dotenv.config();

export const secrets = {
  jwt: process.env.JWT_SECRET,
} as const;
