import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Connects to the MongoDB database using the connection URI from the environment variables.
 * Logs a message on successful connection or exits the process with an error message on failure.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Attempt to connect to the MongoDB server
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (err) {
    // Log the error message and exit the process if the connection fails
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
