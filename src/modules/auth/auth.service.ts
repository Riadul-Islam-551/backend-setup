const loginUser = async (email: string, password: number) => {
  const user = {
    email: "riadul@gmail.com",
    password: 123456,
  };

  if (!user) throw new Error("user not found");
  if (user.email !== email || user.password !== password)
    throw new Error("invalid email or password");

  return user;
};

export const authService = {
  loginUser,
};
