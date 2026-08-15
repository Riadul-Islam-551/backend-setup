import { prisma } from "../../lib/prisma.js";
import type { UserRegisterInput } from "./auth.validation.js";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";
import { conflictError } from "../../utils/httpStatusError.js";

const registerUser = async (data: UserRegisterInput) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser)
    throw conflictError('user already registered')

  const hashPassword = await bcrypt.hash(data.password, Number(env.saltRounds));

  const user = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return user;
};

export const authService = {
  registerUser,
};
