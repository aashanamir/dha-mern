import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js"
import { Category } from "../model/category.js";
import fs from "fs";
import path from "path";

export const createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name || !req.file) {
    return next(new ErrorHandler("Please provide category name and image", 400));
  }

  const imagePath = req.file.path; 

  let category = await Category.findOne({ name });

  if (category) {
    return next(new ErrorHandler("Category already exists", 400));
  }

  // Create new category
  category = await Category.create({
    name,
    image: imagePath,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});


export const getAllCategories = catchAsyncError(async (req, res, next) => {
  // Parse query parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30; 
  const skip = (page - 1) * limit; 

  const categories = await Category.find()
    .skip(skip)
    .limit(limit);

  const totalCategories = await Category.countDocuments();

  // Calculate total pages
  const totalPages = Math.ceil(totalCategories / limit);

  res.status(200).json({
    success: true,
    categories,
    pagination: {
      currentPage: page,
      totalPages,
      totalCategories,
      limit,
    },
  });
});


export const getCategoryById = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});


export const updateCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const categoryId = req.params.id;

  let category = await Category.findById(categoryId);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Update name if provided
  if (name) {
    category.name = name;
  }

  // Update image if a new file is uploaded
  if (req.file) {
    if (category.image) {
      const oldImagePath = path.join(process.cwd(), category.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    category.image = req.file.path;
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});



export const deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});