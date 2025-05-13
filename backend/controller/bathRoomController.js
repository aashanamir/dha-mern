import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Bathrooms } from "../model/Bathroom.js";

export const createBathroom = catchAsyncError(async (req, res, next) => {
  const { count } = req.body;

  if (!count) {
    return next(new ErrorHandler("Please provide bathroom count", 400));
  }

  let bathroom = await Bathrooms.findOne({ count });

  if (bathroom) {
    return next(new ErrorHandler("Bathroom count already exists", 400));
  }

  bathroom = await Bathrooms.create({ count });

  res.status(201).json({
    success: true,
    message: "Bathroom created successfully",
    bathroom,
  });
});

export const getAllBathrooms = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const bathrooms = await Bathrooms.find().skip(skip).limit(limit);
  const totalBathrooms = await Bathrooms.countDocuments();

  const totalPages = Math.ceil(totalBathrooms / limit);

  res.status(200).json({
    success: true,
    bathrooms,
    pagination: {
      currentPage: page,
      totalPages,
      totalBathrooms,
      limit,
    },
  });
});

export const getBathroomById = catchAsyncError(async (req, res, next) => {
  const bathroom = await Bathrooms.findById(req.params.id);

  if (!bathroom) {
    return next(new ErrorHandler("Bathroom not found", 404));
  }

  res.status(200).json({
    success: true,
    bathroom,
  });
});

export const updateBathroom = catchAsyncError(async (req, res, next) => {
  const { count } = req.body;
  const bathroomId = req.params.id;

  let bathroom = await Bathrooms.findById(bathroomId);

  if (!bathroom) {
    return next(new ErrorHandler("Bathroom not found", 404));
  }

  if (count) {
    bathroom.count = count;
  }

  await bathroom.save();

  res.status(200).json({
    success: true,
    message: "Bathroom updated successfully",
    bathroom,
  });
});

export const deleteBathroom = catchAsyncError(async (req, res, next) => {
  const bathroom = await Bathrooms.findById(req.params.id);

  if (!bathroom) {
    return next(new ErrorHandler("Bathroom not found", 404));
  }

  await bathroom.deleteOne();

  res.status(200).json({
    success: true,
    message: "Bathroom deleted successfully",
  });
});