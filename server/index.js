import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import userRoutes from "./Routes/user_routes.js";
import companyRoutes from "./Routes/company_routes.js";

// Initialize Express application
export const app = express();

// Set up CORS middleware
app.use(cors());

// Load environment variables from .env file
config({ path: "./.env" });

// Set up middlewares for request parsing and cookie handling
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON payloads

// Routes
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);

// Set up error handling middleware
app.use(errorMiddleware);
