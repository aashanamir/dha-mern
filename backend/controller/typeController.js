import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Type } from "../model/Type.js";

export const createType = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Please provide type name", 400));
  }

  let type = await Type.findOne({ name });

  if (type) {
    return next(new ErrorHandler("Type already exists", 400));
  }

  type = await Type.create({ name });

  res.status(201).json({
    success: true,
    message: "Type created successfully",
    type,
  });
});

export const getAllTypes = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const types = await Type.find().skip(skip).limit(limit);
  const totalTypes = await Type.countDocuments();

  const totalPages = Math.ceil(totalTypes / limit);

  res.status(200).json({
    success: true,
    types,
    pagination: {
      currentPage: page,
      totalPages,
      totalTypes,
      limit,
    },
  });
});

export const getTypeById = catchAsyncError(async (req, res, next) => {
  const type = await Type.findById(req.params.id);

  if (!type) {
    return next(new ErrorHandler("Type not found", 404));
  }

  res.status(200).json({
    success: true,
    type,
  });
});

export const updateType = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const typeId = req.params.id;

  let type = await Type.findById(typeId);

  if (!type) {
    return next(new ErrorHandler("Type not found", 404));
  }

  if (name) {
    type.name = name;
  }

  await type.save();

  res.status(200).json({
    success: true,
    message: "Type updated successfully",
    type,
  });
});

export const deleteType = catchAsyncError(async (req, res, next) => {
  const type = await Type.findById(req.params.id);

  if (!type) {
    return next(new ErrorHandler("Type not found", 404));
  }

  await type.deleteOne();

  res.status(200).json({
    success: true,
    message: "Type deleted successfully",
  });
});