// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(); // Create a single instance in production
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); // Use global to cache the instance in development
  }
  prisma = global.prisma;
}

export default prisma; // Make sure you export it as default
