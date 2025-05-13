import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} from "../controller/subCategoryController.js";

const router = express.Router();

// Create a new subcategory
router.post("/", createSubcategory);

// Get all subcategories
router.get("/", getAllSubcategories);

// Get subcategory by ID
router.get("/:id", getSubcategoryById);

// Update subcategory by ID
router.put("/:id", updateSubcategory);

// Delete subcategory by ID
router.delete("/:id", deleteSubcategory);

export default router;