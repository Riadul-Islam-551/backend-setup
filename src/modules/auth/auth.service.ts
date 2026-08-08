import AppError from "../../utils/appError.js";

const loginUser = async (email: string, password: number) => {
  const user = {
    email: "riadul@gmail.com",
    password: 123456,
  };

  if (!user) throw AppError(404, "User not found");
  if (user.email !== email || user.password !== password)
    throw AppError(401, "invalid email or password");

  return user;
};

export const authService = {
  loginUser,
};
