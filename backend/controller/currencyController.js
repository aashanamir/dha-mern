import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Currency } from "../model/currency.js";

export const createCurrency = catchAsyncError(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new ErrorHandler("Please provide currency code", 400));
  }

  let currency = await Currency.findOne({ code });

  if (currency) {
    return next(new ErrorHandler("Currency already exists", 400));
  }

  currency = await Currency.create({ code });

  res.status(201).json({
    success: true,
    message: "Currency created successfully",
    currency,
  });
});

export const getAllCurrencies = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  const currencies = await Currency.find().skip(skip).limit(limit);
  const totalCurrencies = await Currency.countDocuments();

  const totalPages = Math.ceil(totalCurrencies / limit);

  res.status(200).json({
    success: true,
    currencies,
    pagination: {
      currentPage: page,
      totalPages,
      totalCurrencies,
      limit,
    },
  });
});

export const getCurrencyById = catchAsyncError(async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new ErrorHandler("Currency not found", 404));
  }

  res.status(200).json({
    success: true,
    currency,
  });
});

export const updateCurrency = catchAsyncError(async (req, res, next) => {
  const { code } = req.body;
  const currencyId = req.params.id;

  let currency = await Currency.findById(currencyId);

  if (!currency) {
    return next(new ErrorHandler("Currency not found", 404));
  }

  if (code) {
    currency.code = code;
  }

  await currency.save();

  res.status(200).json({
    success: true,
    message: "Currency updated successfully",
    currency,
  });
});

export const deleteCurrency = catchAsyncError(async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new ErrorHandler("Currency not found", 404));
  }

  await currency.deleteOne();

  res.status(200).json({
    success: true,
    message: "Currency deleted successfully",
  });
});