import express from "express";
import { isAuthenticated } from "../middlewares/isAuth.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controller/propertyController.js";
import { uploadPropertyFiles } from "../middlewares/propertiesMulter.js";

const router = express.Router();

// Create Property
router.post("/", uploadPropertyFiles, createProperty);

// Get All Properties
router.get("/", getAllProperties);

// Get Property by ID
router.get("/:id", getPropertyById);

// Update Property
router.put("/:id", uploadPropertyFiles, updateProperty);

// Delete Property
router.delete("/:id", deleteProperty);

export default router;