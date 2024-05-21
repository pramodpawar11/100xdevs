import { type ClassValue, clsx } from "clsx"
import mongoose from "mongoose"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const connectionToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to database');
      return;
    }
    const { connection } = await mongoose.connect(process.env.MONGO_URL as string, {
      dbName: "nextAuth"
    });
    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.error('Error in connecting to database:', error);
    throw new Error("Error in connecting to database");
  }
};