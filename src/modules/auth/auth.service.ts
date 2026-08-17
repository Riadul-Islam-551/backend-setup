import { prisma } from "../../lib/prisma.js";
import type {
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "./auth.validation.js";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../../utils/httpStatusError.js";

const registerUser = async (data: UserRegisterInput) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw conflictError("user already registered");

  const hashPassword = await bcrypt.hash(data.password, Number(env.saltRounds));

  const user = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return user;
};

const loginUser = async (data: UserLoginInput) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!existingUser) {
    throw unauthorizedError("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(
    data.password,
    existingUser.password,
  );

  if (!isPasswordMatched) {
    throw unauthorizedError("Invalid email or password");
  }

  const { password, ...userWithoutPassword } = existingUser;

  return userWithoutPassword;
};

const deleteUser = async (id: string) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    throw notFoundError("User not found");
  }

  const deletedUser = await prisma.users.delete({
    where: {
      id: id,
    },
  });

  return {
    id: deletedUser.id,
    name: deletedUser.name,
    email: deletedUser.email,
  };
};

const updateUser = async (id: string, data: UserUpdateInput) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    throw notFoundError("User not found");
  }

  const updateData: {
    name?: string;
    password?: string;
    bio?: string;
    phone?: string;
    avatar?: string;
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.bio !== undefined) {
    updateData.bio = data.bio;
  }

  if (data.phone !== undefined) {
    updateData.phone = data.phone;
  }

  if (data.avatar !== undefined) {
    updateData.avatar = data.avatar;
  }

  if (data.password !== undefined) {
    updateData.password = await bcrypt.hash(
      data.password,
      Number(env.saltRounds),
    );
  }

  const user = await prisma.users.update({
    where: {
      id,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      phone: true,
      avatar: true,
    },
  });

  return user;
};

const getSpecificUser = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      phone: true,
      avatar: true,
    },
  });

  return user
};

const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      phone: true,
      avatar: true,
    },
  });

  return users;
};

export const authService = {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getSpecificUser,
  getAllUsers,
};
