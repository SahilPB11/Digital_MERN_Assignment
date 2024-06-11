import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

// Function to connect with the database
export const connect_with_database = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from environment variables
    await mongoose
      .connect(process.env.DATABASE_URL, {
        // Specify the database name
        dbName: "Digital_Jalebi_Assigment",
      })
      // Log a success message with the host information once connected
      .then((c) => {
        logger.info(`Database connected safely with ${c.connection.host}`);
      });
  } catch (error) {
    // Log any errors that occur during the connection attempt
    logger.error("Database connection failed", { error: error.message });
  }
};
