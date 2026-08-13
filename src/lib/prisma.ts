import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";

const connectionString = env.databaseURL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`select 1`;
    console.log("database connected successfully");
  } catch (error) {
    throw new Error(`db url issue ${(error as Error).message}`);
  }
};

export { prisma };
