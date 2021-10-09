import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["query", "info"],
});

export { db };
