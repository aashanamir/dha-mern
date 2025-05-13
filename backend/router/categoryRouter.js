import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";
import upload from "../middlewares/multer.js"; // Multer middleware for file upload

const router = express.Router();

// Create a new category
router.post("/", upload.single("image"), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Update category by ID
router.put("/:id", upload.single("image"), updateCategory);

// Delete category by ID
router.delete("/:id", deleteCategory);

export default router;