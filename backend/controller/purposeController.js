import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Purpose } from "../model/purpose.js";

export const createPurpose = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Please provide purpose name", 400));
  }

  let purpose = await Purpose.findOne({ name });

  if (purpose) {
    return next(new ErrorHandler("Purpose already exists", 400));
  }

  purpose = await Purpose.create({ name });

  res.status(201).json({
    success: true,
    message: "Purpose created successfully",
    purpose,
  });
});

export const getAllPurposes = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const purposes = await Purpose.find().skip(skip).limit(limit);
  const totalPurposes = await Purpose.countDocuments();

  const totalPages = Math.ceil(totalPurposes / limit);

  res.status(200).json({
    success: true,
    purposes,
    pagination: {
      currentPage: page,
      totalPages,
      totalPurposes,
      limit,
    },
  });
});

export const getPurposeById = catchAsyncError(async (req, res, next) => {
  const purpose = await Purpose.findById(req.params.id);

  if (!purpose) {
    return next(new ErrorHandler("Purpose not found", 404));
  }

  res.status(200).json({
    success: true,
    purpose,
  });
});

export const updatePurpose = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const purposeId = req.params.id;

  let purpose = await Purpose.findById(purposeId);

  if (!purpose) {
    return next(new ErrorHandler("Purpose not found", 404));
  }

  if (name) {
    purpose.name = name;
  }

  await purpose.save();

  res.status(200).json({
    success: true,
    message: "Purpose updated successfully",
    purpose,
  });
});

export const deletePurpose = catchAsyncError(async (req, res, next) => {
  const purpose = await Purpose.findById(req.params.id);

  if (!purpose) {
    return next(new ErrorHandler("Purpose not found", 404));
  }

  await purpose.deleteOne();

  res.status(200).json({
    success: true,
    message: "Purpose deleted successfully",
  });
});