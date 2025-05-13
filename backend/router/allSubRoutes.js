import express from "express";

import {
  createPurpose,
  getAllPurposes,
  getPurposeById,
  updatePurpose,
  deletePurpose,
} from "../controller/purposeController.js";
import {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
} from "../controller/typeController.js";
import {
  createBedroom,
  getAllBedrooms,
  getBedroomById,
  updateBedroom,
  deleteBedroom,
} from "../controller/bedRoomController.js";
import {
  createBathroom,
  getAllBathrooms,
  getBathroomById,
  updateBathroom,
  deleteBathroom,
} from "../controller/bathRoomController.js";
import {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
} from "../controller/currencyController.js";

const router = express.Router();

// Purpose Routes
router.post("/purposes", createPurpose);
router.get("/purposes", getAllPurposes);
router.get("/purposes/:id", getPurposeById);
router.put("/purposes/:id", updatePurpose);
router.delete("/purposes/:id", deletePurpose);

// Type Routes
router.post("/types", createType);
router.get("/types", getAllTypes);
router.get("/types/:id", getTypeById);
router.put("/types/:id", updateType);
router.delete("/types/:id", deleteType);

// Bedroom Routes
router.post("/bedrooms", createBedroom);
router.get("/bedrooms", getAllBedrooms);
router.get("/bedrooms/:id", getBedroomById);
router.put("/bedrooms/:id", updateBedroom);
router.delete("/bedrooms/:id", deleteBedroom);

// Bathroom Routes
router.post("/bathrooms", createBathroom);
router.get("/bathrooms", getAllBathrooms);
router.get("/bathrooms/:id", getBathroomById);
router.put("/bathrooms/:id", updateBathroom);
router.delete("/bathrooms/:id", deleteBathroom);

// Currency Routes
router.post("/currencies", createCurrency);
router.get("/currencies", getAllCurrencies);
router.get("/currencies/:id", getCurrencyById);
router.put("/currencies/:id", updateCurrency);
router.delete("/currencies/:id", deleteCurrency);

export default router;