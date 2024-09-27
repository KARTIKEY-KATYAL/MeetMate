import { clerkClient, currentUser } from "@clerk/nextjs/server"; // Import Clerk functions
import prisma from "@/lib/prisma"; // Ensure you are importing the Prisma client correctly

export const checkUser = async () => {
  const user = await currentUser(); // Get the current user

  if (!user) {
    return null; // Return null if no user is found
  }

  try {
    // Check if the user already exists in the database
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser; // Return the existing user
    }

    // Create a username using first and last names
    const name = `${user.firstName} ${user.lastName}`;
    const username = `${name.split(" ").join("-")}${user.id.slice(-4)}`; // Create a unique username

    // Update username in Clerk using clerkClient() as a function
    await clerkClient().users.updateUser(user.id, {
      username,
    });

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username,
      },
    });

    return newUser; // Return the newly created user
  } catch (error) {
    console.error("Error checking or creating user:", error);
    throw new Error(`Failed to check or create user: ${error.message}`); // Include error message for clarity
  }
};
