"use server";

import prismadb from "@/lib/prismadb";

interface UserReturnType {
  email: string;
  registered: "yes" | "no";
  newsletter: "yes" | "no";
}

export const fetchUser = async () => {
  try {
    let users: UserReturnType[] = [];
    const regUser = await prismadb.user.findMany({
      select: {
        email: true,
      },
    });
    const newsUser = await prismadb.newsletter.findMany({
      select: {
        email: true,
      },
    });

    const newsUserEmails = new Set(newsUser.map((user) => user.email));

    users = regUser.map((user) => ({
      email: user.email!,
      registered: "yes",
      newsletter: newsUserEmails.has(user.email!) ? "yes" : "no",
    }));
    
    newsUser.forEach((user) => {
      if (!users.find((reg) => reg.email === user.email)) {
        users.push({
          email: user.email!,
          registered: "no",
          newsletter: "yes",
        });
      }
    });

    return { users: users, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, success: false };
  }
};
