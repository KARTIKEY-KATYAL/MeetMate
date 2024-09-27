"use server";
import prisma from "@/lib/prisma"; // Importing the Prisma client
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  // Validate the username input
  if (!username || typeof username !== "string" || username.length < 3) {
    throw new Error("Invalid username");
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check if the username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername && existingUsername.clerkUserId !== userId) {
    throw new Error("Username is already taken");
  }

  // Update the username in your local DB
  await prisma.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  // Update the username with Clerk
  try {
    await clerkClient.users.updateUser(userId, {
      username,
    });
  } catch (error) {
    throw new Error("Failed to update username with Clerk");
  }

  return { success: true };
}
