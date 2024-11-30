"use server";

import prismadb from "../lib/prismadb";



export const getUsers = async () => {
  const users = await prismadb.user.findMany();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified?.toString(),
    role: user.role,
  }));
};
