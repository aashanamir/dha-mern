import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Property } from "../model/properties.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

// Create Property
export const createProperty = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    location,
    price,
    currency,
    type,
    purpose,
    bedrooms,
    bathrooms,
    area,
    label,
    category,
    subcategory,
    isFeatured,
    isActive,
    agent,
  } = req.body;

  // Check if images are uploaded
  if (!req.files || !req.files.images) {
    return next(new ErrorHandler("At least one image is required", 400));
  }

  const images = req.files.images.map((file) => file.path);
  let files = null;

  if (req.files.files) {
    files = req.files.files[0].path;
  }

  const property = await Property.create({
    name,
    description,
    location,
    price,
    currency,
    type,
    purpose,
    bedrooms,
    bathrooms,
    area,
    label,
    category,
    subcategory,
    images,
    files,
    isFeatured: isFeatured || false,
    isActive: isActive || true,
    agent,
  });

  res.status(201).json({
    success: true,
    message: "Property created successfully",
    property,
  });
});

// Get All Properties (with pagination, filtering, and sorting)
/*
export const getAllProperties = catchAsyncError(async (req, res, next) => {
  // Parse query parameters
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const skip = (page - 1) * limit; 

  // Filtering
  const { category, subcategory, minPrice, maxPrice, purpose, type, bedrooms, bathrooms } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  if (purpose) filter.purpose = purpose;
  if (type) filter.type = type;
  if (bedrooms) filter.bedrooms = bedrooms;
  if (bathrooms) filter.bathrooms = bathrooms;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // Sorting
  const sortBy = req.query.sortBy || "createdAt"; 
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  // Fetch properties with pagination, filtering, and sorting
  const properties = await Property.find(filter)
    .populate("currency")
    .populate("type")
    .populate("purpose")
    .populate("bedrooms")
    .populate("bathrooms")
    .populate("category")
    .populate("subcategory")
    .populate("agent")
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  // Get the total number of properties (for pagination)
  const totalProperties = await Property.countDocuments(filter);

  // Calculate total pages
  const totalPages = Math.ceil(totalProperties / limit);

  res.status(200).json({
    success: true,
    properties,
    pagination: {
      currentPage: page,
      totalPages,
      totalProperties,
      limit,
    },
  });
});

*/
// export const getAllProperties = catchAsyncError(async (req, res, next) => {
//   const { category, subcategory, purpose, type, bedrooms, bathrooms, minPrice, maxPrice } = req.query;
//   const filter = {};

//   // Validate and add filters
//   if (category && mongoose.Types.ObjectId.isValid(category)) {
//     filter.category = category;
//   }
//   if (subcategory && mongoose.Types.ObjectId.isValid(subcategory)) {
//     filter.subcategory = subcategory;
//   }
//   if (purpose && mongoose.Types.ObjectId.isValid(purpose)) {
//     filter.purpose = purpose;
//   }
//   if (type && mongoose.Types.ObjectId.isValid(type)) {
//     filter.type = type;
//   }
//   if (bedrooms && mongoose.Types.ObjectId.isValid(bedrooms)) {
//     filter.bedrooms = bedrooms;
//   }
//   if (bathrooms && mongoose.Types.ObjectId.isValid(bathrooms)) {
//     filter.bathrooms = bathrooms;
//   }
//   if (minPrice || maxPrice) {
//     filter.price = {};
//     if (minPrice) filter.price.$gte = parseFloat(minPrice);
//     if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
//   }

//   // Pagination
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const properties = await Property.find(filter)
//     .populate("currency")
//     .populate("type")
//     .populate("purpose")
//     .populate("bedrooms")
//     .populate("bathrooms")
//     .populate("category")
//     .populate("subcategory")
//     .populate("agent")
//     .skip(skip)
//     .limit(limit);

//   const totalProperties = await Property.countDocuments(filter);
//   const totalPages = Math.ceil(totalProperties / limit);

//   res.status(200).json({
//     success: true,
//     properties,
//     pagination: {
//       currentPage: page,
//       totalPages,
//       totalProperties,
//       limit,
//     },
//   });
// });



export const getAllProperties = catchAsyncError(async (req, res, next) => {
  const { category, subcategory, sortBy, purpose, propertyType, bedrooms, bathrooms, priceRange, area } = req.query;
  const filter = {};
  let sortOption = {};

  // Validate and add filters
  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = category;
  }
  if (subcategory && mongoose.Types.ObjectId.isValid(subcategory) && subcategory !== "all") {
    filter.subcategory = subcategory;
  }
  if (propertyType && mongoose.Types.ObjectId.isValid(propertyType) && propertyType !== "all") {
    filter.type = propertyType;
  }
  if (purpose && mongoose.Types.ObjectId.isValid(purpose)) {
    filter.purpose = purpose;
  }
  if (bedrooms && mongoose.Types.ObjectId.isValid(bedrooms)) {
    filter.bedrooms = bedrooms;
  }
  if (bathrooms && mongoose.Types.ObjectId.isValid(bathrooms)) {
    filter.bathrooms = bathrooms;
  }

  // Handle Price Range filter (with validation)
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
  }

  // Handle Area Range filter (with validation)
  if (area) {
    const [minArea, maxArea] = area.split("-").map(Number);
    if (!isNaN(minArea) && !isNaN(maxArea)) {
      filter.area = { $gte: minArea, $lte: maxArea };
    }
  }

    // Handle Sorting
    if (sortBy === "price-low-high") {
      sortOption = { price: 1 }; // Ascending order (Low to High)
    } else if (sortBy === "price-high-low") {
      sortOption = { price: -1 }; // Descending order (High to Low)
    }

    sortOption = { createdAt: -1 }; // Default sorting by creation date (latest first)

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const properties = await Property.find(filter)
    .populate("currency")
    .populate("type")
    .populate("purpose")
    .populate("bedrooms")
    .populate("bathrooms")
    .populate("category")
    .populate("subcategory")
    .populate("agent")
    .sort(sortOption) // Apply sorting
    .skip(skip)
    .limit(limit);

  const totalProperties = await Property.countDocuments(filter);
  const totalPages = Math.ceil(totalProperties / limit);

  res.status(200).json({
    success: true,
    properties,
    pagination: {
      currentPage: page,
      totalPages,
      totalProperties,
      limit,
    },
  });
});





// Get
//  Property by ID
export const getPropertyById = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id)
    .populate("currency")
    .populate("type")
    .populate("purpose")
    .populate("bedrooms")
    .populate("bathrooms")
    .populate("category")
    .populate("subcategory")
    .populate("agent");

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// Update Property
export const updateProperty = catchAsyncError(async (req, res, next) => {
  const propertyId = req.params.id;
  const updates = req.body;

  // Handle file uploads if provided
  if (req.files) {
    if (req.files.images) {
      updates.images = req.files.images.map((file) => file.path);
    }
    if (req.files.files) {
      updates.files = req.files.files[0].path;
    }
  }

  const property = await Property.findByIdAndUpdate(propertyId, updates, {
    new: true,
    runValidators: true,
  })
    .populate("currency")
    .populate("type")
    .populate("purpose")
    .populate("bedrooms")
    .populate("bathrooms")
    .populate("category")
    .populate("subcategory")
    .populate("agent");

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
    property,
  });
});

// Delete Property
export const deleteProperty = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  await property.deleteOne();

  res.status(200).json({
    success: true,
    message: "Property deleted successfully",
  });
});