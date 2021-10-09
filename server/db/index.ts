import Prisma from "@prisma/client";

const db = new Prisma.PrismaClient({
  log: ["query", "info"],
});

export { db };
