import { useSession } from "next-auth/react";

export const useUserData = () => {
  const { data: session, status } = useSession();

  const userLoading = status === "loading";

  if (userLoading) {
    return { user: null, userLoading, userLoaded: false };
  }

  if (!session?.user) {
    return { user: null, userLoading: false, userLoaded: false };
  }

  const { user } = session;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      isOAuth: user.isOAuth,
      username: user.username,
      bio: user.bio,
    },
    userLoading: false,
  };
};
