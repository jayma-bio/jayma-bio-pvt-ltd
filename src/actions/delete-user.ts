"use server";

import prismadb from "@/lib/prismadb";

export const deleteUser = async (email: string) => {
  if (!email) {
    return { message: "Email is required", success: false };
  }

  try {
    // First check if user exists in either table
    const user = await prismadb.user.findUnique({
      where: { email },
    });

    const newsletter = await prismadb.newsletter.findUnique({
      where: { email },
    });

    // Delete from respective tables if records exist
    const deletePromises = [];

    if (user) {
      deletePromises.push(
        prismadb.user.delete({
          where: { email },
        })
      );
    }

    if (newsletter) {
      deletePromises.push(
        prismadb.newsletter.delete({
          where: { email },
        })
      );
    }

    if (deletePromises.length === 0) {
      return { message: "User not found in any table", success: false };
    }

    // Execute all deletions concurrently
    await Promise.all(deletePromises);

    return { message: "User deleted successfully", success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return {
      message: "Failed to delete user",
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
    };
  }
};
