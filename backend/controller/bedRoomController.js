import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Bedrooms } from "../model/Bedroom.js";

export const createBedroom = catchAsyncError(async (req, res, next) => {
  const { count } = req.body;

  if (!count) {
    return next(new ErrorHandler("Please provide bedroom count", 400));
  }

  let bedroom = await Bedrooms.findOne({ count });

  if (bedroom) {
    return next(new ErrorHandler("Bedroom count already exists", 400));
  }

  bedroom = await Bedrooms.create({ count });

  res.status(201).json({
    success: true,
    message: "Bedroom created successfully",
    bedroom,
  });
});

export const getAllBedrooms = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const bedrooms = await Bedrooms.find().skip(skip).limit(limit);
  const totalBedrooms = await Bedrooms.countDocuments();

  const totalPages = Math.ceil(totalBedrooms / limit);

  res.status(200).json({
    success: true,
    bedrooms,
    pagination: {
      currentPage: page,
      totalPages,
      totalBedrooms,
      limit,
    },
  });
});

export const getBedroomById = catchAsyncError(async (req, res, next) => {
  const bedroom = await Bedrooms.findById(req.params.id);

  if (!bedroom) {
    return next(new ErrorHandler("Bedroom not found", 404));
  }

  res.status(200).json({
    success: true,
    bedroom,
  });
});

export const updateBedroom = catchAsyncError(async (req, res, next) => {
  const { count } = req.body;
  const bedroomId = req.params.id;

  let bedroom = await Bedrooms.findById(bedroomId);

  if (!bedroom) {
    return next(new ErrorHandler("Bedroom not found", 404));
  }

  if (count) {
    bedroom.count = count;
  }

  await bedroom.save();

  res.status(200).json({
    success: true,
    message: "Bedroom updated successfully",
    bedroom,
  });
});

export const deleteBedroom = catchAsyncError(async (req, res, next) => {
  const bedroom = await Bedrooms.findById(req.params.id);

  if (!bedroom) {
    return next(new ErrorHandler("Bedroom not found", 404));
  }

  await bedroom.deleteOne();

  res.status(200).json({
    success: true,
    message: "Bedroom deleted successfully",
  });
});