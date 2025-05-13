import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import path from "path";


// Dotenv Configuration
config({
  path : "./config/.env"
})

// Serve the "uploads" folder as a static directory
const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

connectDb();
// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
import Users from "./router/userRouter.js";
import Property from "./router/propertyRouter.js";
import Category from "./router/categoryRouter.js";
import SubCategory from "./router/subCategoryRouter.js";
import AllSubRoutes from "./router/allSubRoutes.js";

app.use("/api/v1/user" , Users);
app.use("/api/v1/property" , Property);
app.use("/api/v1/category" , Category);
app.use("/api/v1/subcategory" , SubCategory);
app.use("/api/v1/allSubRoutes" , AllSubRoutes);



export default app;