import { Subcategory } from "../model/subCategory.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js"

export const createSubcategory = catchAsyncError(async (req, res, next) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return next(new ErrorHandler("Please provide name and category", 400));
  }

  const subcategory = await Subcategory.create({ name, category });

  res.status(201).json({
    success: true,
    message: "Subcategory created successfully",
    subcategory,
  });
});


export const getAllSubcategories = catchAsyncError(async (req, res, next) => {
  // Parse query parameters
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 40; 
  const skip = (page - 1) * limit; 

  const subcategories = await Subcategory.find()
    .populate("category")
    .skip(skip)
    .limit(limit);

  const totalSubcategories = await Subcategory.countDocuments();

  // Calculate total pages
  const totalPages = Math.ceil(totalSubcategories / limit);

  res.status(200).json({
    success: true,
    subcategories,
    pagination: {
      currentPage: page,
      totalPages,
      totalSubcategories,
      limit,
    },
  });
});

export const getSubcategoryById = catchAsyncError(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id).populate("category");

  if (!subcategory) {
    return next(new ErrorHandler("Subcategory not found", 404));
  }

  res.status(200).json({
    success: true,
    subcategory,
  });
});

export const updateSubcategory = catchAsyncError(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategoryId = req.params.id;

  let subcategory = await Subcategory.findById(subcategoryId);

  if (!subcategory) {
    return next(new ErrorHandler("Subcategory not found", 404));
  }

  // Update name if provided
  if (name) {
    subcategory.name = name;
  }

  // Update category if provided
  if (category) {
    subcategory.category = category;
  }

  await subcategory.save();

  res.status(200).json({
    success: true,
    message: "Subcategory updated successfully",
    subcategory,
  });
});

export const deleteSubcategory = catchAsyncError(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory) {
    return next(new ErrorHandler("Subcategory not found", 404));
  }

  await subcategory.deleteOne();

  res.status(200).json({
    success: true,
    message: "Subcategory deleted successfully",
  });
});